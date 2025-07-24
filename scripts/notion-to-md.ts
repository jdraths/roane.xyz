import * as path from "path";
import * as fs from "fs/promises";
import { Client } from "@notionhq/client";
import { NotionConverter } from "notion-to-md";
import {
  NotionExporter,
  ChainData,
  NotionBlock,
  VariableCollector,
} from "notion-to-md/types";
import { MDXRenderer } from "notion-to-md/plugins/renderer";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const notionUrl =
  "https://www.notion.so/Using-Tree-Sitter-to-parse-SQL-23aaa2d5844480829ffbf8a36c0a638e?source=copy_link";
// Extract Notion page ID from URL
function extractNotionPageId(url: string): string {
  // This regex extracts the 32-character ID from a Notion URL
  // It works with both formats:
  // - https://www.notion.so/some-blog-title-231aa2d5844480779235f623d628eb33
  // - https://www.notion.so/some-blog-title-1-231aa2d5844480779235f623d628eb33
  const match = url.match(/([a-f0-9]{32})/i);
  if (!match) {
    throw new Error(`Could not extract Notion page ID from URL: ${url}`);
  }
  return match[1];
}

const pageId = extractNotionPageId(notionUrl);

class FileSystemExporter implements NotionExporter {
  outputDir: string;
  filePath?: string;
  pageId?: string;
  // You can define custom configurations for your plugin, allowing users to tailor it to their needs.
  constructor({ outputDir }: { outputDir: string }) {
    this.outputDir = outputDir;
  }

  async export(data: ChainData): Promise<void> {
    // Create output directory if it doesn't exist
    await fs.mkdir(this.outputDir, { recursive: true });

    this.pageId = data.pageId;
    // Generate filename from page properties or ID
    let title = data.pageId;
    if (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      data.blockTree.properties?.Name &&
      data.blockTree.properties.Name.type === "title" &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      data.blockTree.properties.Name.title
    ) {
      title =
        data.blockTree.properties.Name.title[0]?.plain_text || data.pageId;
    }
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.mdx`;

    // Full path for the file
    this.filePath = path.join(this.outputDir, filename);

    // Write content to file
    await fs.writeFile(this.filePath, data.content, "utf-8");

    console.log(`✓ Exported page to ${this.filePath}`);
  }
}

// Create a utility function for handling comments
function addCommentsAsFootnotes(
  text: string,
  block: NotionBlock,
  variableData: VariableCollector,
) {
  if (!block.comments || block.comments.length === 0) {
    return text;
  }

  const footnotes = variableData.get("footnotes") || [];
  const footnoteIndex = footnotes.length + 1;

  // Process comment text
  const commentText = block.comments
    .map((comment) => comment.rich_text.map((rt) => rt.plain_text).join(""))
    .join(" ");

  footnotes.push(`[^${footnoteIndex}]: ${commentText}`);
  variableData.set("footnotes", footnotes);

  // Return text with footnote reference
  return `${text} [^${footnoteIndex}]`;
}

// Example: https://www.notion.so/On-Code-Etiquette-Meta-Context-Engineering-222aa2d5844480d399f2d357e907e05b?source=copy_link
async function convertWithMedia() {
  try {
    const outputDir = "./public"; // For markdown file
    const mediaDir = path.join(outputDir, "media"); // For downloaded media

    const exporter = new FileSystemExporter({ outputDir: "./posts" });

    const renderer = new MDXRenderer({
      // frontmatter values below also need to exist in TFrontmatter
      frontmatter: {
        defaults: {
          id: pageId,
        },
        include: [
          "Name",
          "Created",
          "Tags",
          "WordCount",
          "Excerpt",
          "PublishedAt",
          "UpdatedAt",
        ],
        rename: {
          Name: "title",
          Created: "createdAt",
          Tags: "tags",
          WordCount: "readTime",
          Excerpt: "excerpt",
          PublishedAt: "publishedAt",
          UpdatedAt: "updatedAt",
        },
        // exclude: ["Tags"],
        // defaults: { draft: false },
        transform: {
          Name: (property) => {
            if (property.type !== "title" || !property.title) return "";
            return property.title[0]?.plain_text || "Untitled";
          },
          Created: (property) => {
            // console.log("Created-check", property)
            if (property.type !== "created_time" || !property.created_time)
              return "";
            return new Date(property.created_time).toISOString().split("T")[0];
          },
          UpdatedAt: (property) => {
            // console.log("Created-check", property)
            if (
              property.type !== "last_edited_time" ||
              !property.last_edited_time
            )
              return "";
            return new Date(property.last_edited_time)
              .toISOString()
              .split("T")[0];
          },
          PublishedAt: (property) => {
            // console.log("Created-check", property)
            if (property.type !== "date" || !property.date) return "";
            return property.date.start;
          },
          Tags: (property) => {
            if (property.type !== "multi_select")
              return [] as unknown as string;
            return property.multi_select.map(
              (tag) => tag.name,
            ) as unknown as string;
          },
          WordCount: (property) => {
            console.log("wordCount-property", property);
            if (
              property.type !== "number" ||
              !property.number ||
              property.number === 0
            )
              return "";
            const minutes = property.number / 265;
            return `${minutes.toFixed(0)} min read`;
          },
          Excerpt: (property) => {
            console.log("excerpt-property", property);
            if (property.type !== "rich_text" || !property.rich_text) return "";
            return property.rich_text[0]?.plain_text || "";
            // return `${minutes.toFixed(0)} min read`;
          },
          // draft: (property) => {
          //   if (property.type !== 'status') return true;
          //   return property.status?.name !== 'Published';
          // },
        },
      },
    });
    renderer.setTemplate(`{{{frontmatter}}}

    {{{imports}}}

    {{{content}}}

    {{{footnotes}}}`); //footnotes placeholder

    // Add a variable to collect footnotes
    renderer.addVariable("footnotes", async (_, context) => {
      const footnotes = context.variableData.get("footnotes") || [];
      if (!footnotes.length) return "";

      return `\n---\n${footnotes.join("\n")}\n`;
    });

    // footnote handling
    // Create a custom transformer for paragraphs
    renderer.createBlockTransformer("paragraph", {
      transform: async ({ block, utils, variableData }) => {
        const text = await utils.transformRichText(block.paragraph.rich_text);
        const processedText = addCommentsAsFootnotes(text, block, variableData);
        // Return normal paragraph
        return `${processedText}\n\n`;
      },
    });
    renderer.createBlockTransformer("heading_1", {
      transform: async ({ block, utils, variableData }) => {
        const text = await utils.transformRichText(block.heading_1.rich_text);
        const processedText = addCommentsAsFootnotes(text, block, variableData);
        return `# ${processedText}\n\n`;
      },
    });
    renderer.createBlockTransformer("to_do", {
      transform: async ({ block, utils, variableData }) => {
        const text = await utils.transformRichText(block.to_do.rich_text);
        const processedText = addCommentsAsFootnotes(text, block, variableData);
        return `${block.to_do.checked ? "- [x]" : "- [ ]"} ${processedText}\n`;
      },
    });
    renderer.createBlockTransformer("bulleted_list_item", {
      transform: async ({ block, utils, variableData }) => {
        const text = await utils.transformRichText(
          block.bulleted_list_item.rich_text,
        );
        const processedText = addCommentsAsFootnotes(text, block, variableData);
        return `- ${processedText}\n`;
      },
    });

    const n2m = new NotionConverter(notion)
      .configureFetcher({ fetchComments: true, fetchPageProperties: true })
      .withRenderer(renderer)
      .withExporter(exporter)
      // Configure media downloading
      .downloadMediaTo({
        outputDir: mediaDir,
        // Update the links in markdown to point to the local media path
        transformPath: (localPath) => `/media/${path.basename(localPath)}`,
      });

    await n2m.convert(pageId);

    console.log(`✓ Converted page to ${exporter.filePath ?? ""}`);
    console.log(`✓ Downloaded media to ${mediaDir}`);
  } catch (error) {
    console.error("Conversion failed:", error);
  }
}

void convertWithMedia();

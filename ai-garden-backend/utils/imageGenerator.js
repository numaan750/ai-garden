import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DASH_SCOPE_API_URL = process.env.CURL_lOCATION;

const hasValue = (val) =>
  val != null && typeof val === "string" && val.trim().length > 0;

const buildPrompt = ({ toolId, toolOptions = {} }) => {
  if (toolOptions.editPrompt) {
    return toolOptions.editPrompt;
  }

  const prompt = toolOptions.customItems || "";
  const secondPrompt = toolOptions.swapWith || "";
  const spaceType = toolOptions.spaceType || "";
  const style = toolOptions.gardenStyle || "";
  const selectedObjs = Array.isArray(toolOptions.selectedObjects)
    ? toolOptions.selectedObjects.join(", ")
    : "";
  const combinedPrompt = [prompt, selectedObjs].filter(Boolean).join(", ");

  switch (toolId) {
    case "garden-design": {
      const s = hasValue(style) ? `${style} ` : "";
      const st = hasValue(spaceType) ? `${spaceType} ` : "garden ";
      return hasValue(combinedPrompt)
        ? `Design a ${s}${st}with ${combinedPrompt}`
        : `A professionally designed ${s}${st}`;
    }

    case "exterior-design": {
      return hasValue(prompt)
        ? `Remove ${prompt} and clean the area`
        : "Clean and tidy garden space";
    }

    case "replace-objects": {
      if (hasValue(prompt) && hasValue(secondPrompt)) {
        return `Replace ${prompt} with ${secondPrompt}`;
      } else if (hasValue(secondPrompt)) {
        return `Replace with ${secondPrompt}`;
      } else {
        return "Garden object replacement";
      }
    }

    case "add-objects": {
      return hasValue(combinedPrompt)
        ? `Add ${combinedPrompt} to the garden`
        : "Add decorative garden elements";
    }

    case "landscaping": {
      const s = hasValue(style) ? `${style} ` : "";
      const st = hasValue(spaceType) ? `${spaceType} ` : "garden ";
      return hasValue(combinedPrompt)
        ? `Professional ${s}${st}landscaping featuring ${combinedPrompt}`
        : `Beautiful ${s}${st}landscape architecture`;
    }

    default:
      return "Enhance and improve this garden image with professional quality, natural lighting, and realistic details.";
  }
};
export const generatePixeliftImage = async ({
  toolId,
  toolOptions = {},
  uploadedImage,
}) => {
  try {
    const prompt = buildPrompt({ toolId, toolOptions });

    const body = {
      model: process.env.DASHSCOPE_MODEL,
      input: {
        messages: [
          {
            role: "user",
            content: [
              { text: prompt },
              ...(uploadedImage ? [{ image: uploadedImage }] : []),
            ],
          },
        ],
      },
      parameters: {
        negative_prompt: "",
        watermark: false,
        width: 512,
        height: 512,
      },
    };

    const response = await fetch(DASH_SCOPE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.DASHSCOPE_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("DashScope API Error:", data);
      throw new Error("Image generation failed");
    }
    const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;
    if (!imageUrl) throw new Error("No image returned from API");
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "pixelift",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Ai-GardenImage Generation Error:", error);
    throw error;
  }
};

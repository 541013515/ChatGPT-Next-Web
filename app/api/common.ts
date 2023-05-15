import { NextRequest } from "next/server";

const OPENAI_URL = "api.openai.com";
const DEFAULT_PROTOCOL = "https";
const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token");
  const openaiPath = req.headers.get("path");

  console.log("[RequestOpenai] ", openaiPath);

  return fetch(`${PROTOCOL}://${BASE_URL}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: req.method,
    body: req.body,
  });
}

export async function proxyOpenai(req: NextRequest) {
  const url = "https://chat.xmn-lv.cn/api/chat-stream";
  console.log("[ProxyOpenai] ", url);

  const options = {
    method: req.method,
    body: req.body,
    headers: {
      "access-code": "xmn",
      path: "v1/chat/completions",
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options);
}

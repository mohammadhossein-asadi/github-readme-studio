import { ImageResponse } from "next/og";

export const alt =
  "GitHub README Studio — professional READMEs generated from your repository";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0e11",
          color: "#ededf0",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#4f46e5",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 24, color: "#9a9aa6" }}>README Studio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 900 }}>
            Professional GitHub READMEs in minutes
          </div>
          <div style={{ fontSize: 28, color: "#9a9aa6", maxWidth: 820 }}>
            Analyze a repository, detect the stack, generate every section — then
            publish as a pull request.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22 }}>
          {["Badges", "Tech stack", "Architecture", "Installation", "Usage"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  border: "1px solid #292930",
                  background: "#17171c",
                  borderRadius: 10,
                  padding: "10px 20px",
                  color: "#c7c2ff",
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}

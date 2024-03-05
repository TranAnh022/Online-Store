import { Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { formattingURL } from "../../utils";

export const ImageList = ({images,onDelete,}: {images: string[];onDelete: (index: number) => void;}) => {

  return (
    <Box flexWrap={"wrap"} display={"flex"}>
      {images.map((image, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <Box sx={{ position: "relative" }}>
            <img
              src={formattingURL(image)}
              alt={`Img ${index + 1}`}
              style={{ maxWidth: "100px", marginRight: "10px" }}
            />
            <ClearIcon
              onClick={() => onDelete(index)}
              sx={{
                position: "absolute",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                left: "80px",
              }}
            />
          </Box>
        </div>
      ))}
    </Box>
  );
};

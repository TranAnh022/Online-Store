import { Button, Grid } from "@mui/material";



export const ImageList = ({images,onDelete,}: {images: string[];onDelete: (index: number) => void;}) => {
  return (
    <Grid container spacing={2} style={{ marginTop: "1rem" }}>
      {images.map((image, index) => (
        <Grid item key={index} xs={6} sm={4} md={3}>
          {typeof image === "string" ? (
            <img src={image} alt={`${index}`} style={{ width: "100%" }} />
          ) : (
            <img
              src={URL.createObjectURL(image)}
              alt={`${index}`}
              style={{ width: "100%" }}
            />
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onDelete(index)}
            style={{ marginTop: "0.5rem" }}
          >
            Delete
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

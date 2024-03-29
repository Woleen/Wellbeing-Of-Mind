import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, ThemeProvider, createTheme } from '@mui/material';
import psychologyImage from "../../images/article_images/psychology.png";
import mentalHealthImage from "../../images/article_images/mental_health.png";
import selfImprovementImage from "../../images/article_images/self_improvement.png";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function ArticleCard({ article }) {
  const lowerCaseType = article.type.toLowerCase().replace('-', '_');

  const typeImages = {
    psychology: psychologyImage,
    mental_health: mentalHealthImage,
    self_improvement: selfImprovementImage,
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: "345px", padding: "1px", boxShadow: "initial"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="256"
            image={typeImages[lowerCaseType]}
            alt={article.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="inherit">
              {article.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}

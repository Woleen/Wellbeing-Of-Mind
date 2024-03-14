import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import psychologyImage from "../../images/article_images/psychology.jpg";
import mentalHealthImage from "../../images/article_images/mental_health.jpg";
import selfImprovementImage from "../../images/article_images/self_improvement.jpg";

export default function ArticleCard({ article }) {
  const lowerCaseType = article.type.toLowerCase().replace('-', '_');

  const typeImages = {
    psychology: psychologyImage,
    mental_health: mentalHealthImage,
    self_improvement: selfImprovementImage,
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="256"
          image={typeImages[lowerCaseType]}
          alt={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}


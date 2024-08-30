import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'bulma/css/bulma.min.css';
import {CardActionArea} from '@mui/material';
import theme from "../style/palette";

function CustomCard({ horizontal, maxWidth, contentStyle, cardDescriptionStyle, numberContentRow, children, img , onClick }) {
    let style
    if(horizontal){ // TODO: punto modificato palette
        style = {width: maxWidth, display: 'flex', boxShadow: `0px 0px 1px ${theme.palette.primary.main}`}
    }
    else{ // TODO: punto modificato palette
        style = {width: maxWidth, display: 'flex', flexDirection: 'column', boxShadow: `0px 0px 1px ${theme.palette.primary.main}`}
    }

    return (
        <Card sx={style}>
            {!!onClick ? (<CardActionArea onClick={onClick}>
                <CardMedia
                    style={{padding: "5px", position: "relative", margin: "auto", width: "auto", height: "350px"}}
                    component="img"
                    image={img}
                    alt="img"
                />
                </CardActionArea>) :
                <CardMedia
                    style={{padding: "5px", position: "relative", margin: "auto", width: "auto", height: "350px"}}
                    component="img"
                    image={img}
                    alt="img"
                />}
            <CardContent sx={cardDescriptionStyle}>
                <Typography sx={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: numberContentRow,
                    overflow: 'hidden', textOverflow: 'ellipsis', ...contentStyle}} component={"div"}>
                    {children}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CustomCard;
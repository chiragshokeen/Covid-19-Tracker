import React from 'react' ;
import {Card , CardContent ,Typography } from "@material-ui/core" ; 
import "./InfoBox.css" ; 

function InfoBox({title ,cases ,isRed ,isPurple , isGreen,active ,  total , ...props  }) { //dividing the infobox to 3 parts using props
    return (
        <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"}  ${
            isRed && "infoBox--red"} ${isPurple && "infoBox--purple"}
          }`}
      >
            <CardContent>

               {/* Title coronavirus cases */}

               <Typography className ="infoBox__title" color =" textSecondary">
                   {title}
               </Typography>

               {/* Number of cases */}

               <h2 className={`infoBox__cases ${isGreen &&  "infoBox__cases--green"}
                ${isPurple &&  "infoBox__cases--purple"}`}>
          {cases}
        </h2>

               {/* total */}
               <Typography className ="infoBox__total" color =" textSecondary">
                   {total} Total
               </Typography>


            </CardContent>
            
        </Card>
    )
}

export default InfoBox;

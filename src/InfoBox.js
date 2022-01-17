import React from 'react' ;
import {Card , CardContent ,Typography } from "@material-ui/core" ; 

function InfoBox({title ,cases , total  }) { //dividing the infobox to 3 parts using props
    return (
        <Card className = "infoBox">
            <CardContent>

               {/* Title coronavirus cases */}

               <Typography className ="infoBox__title" color =" textSecondary">
                   {title}
               </Typography>

               {/* Number of cases */}

               <h2 className ="infoBox__cases">{cases}</h2>

               {/* total */}
               <Typography className ="infoBox__total" color =" textSecondary">
                   {total} Total
               </Typography>


            </CardContent>
            
        </Card>
    )
}

export default InfoBox;

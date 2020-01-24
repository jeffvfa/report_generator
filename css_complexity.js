'use strict';
const fs = require('fs'); 


const calculateCSSComplexity = function(FILE_PATH){ 
        let css_file = fs.readFileSync(FILE_PATH, 'utf8'); 
        
        let quantity_of_objects = css_file.split('}').length - 1;
        
        if ( quantity_of_objects < 30) {
            return 'BAIXA';
        } 
        else if (quantity_of_objects > 30 && quantity_of_objects < 60){
            return 'MÉDIA';
        }
        else{ 
            return 'ALTA';
        }
    };


// it receives an list of css files and calculates their complexity
exports.default = calculateCSSComplexity;



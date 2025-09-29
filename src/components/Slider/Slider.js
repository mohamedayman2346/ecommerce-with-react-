import {motion} from 'framer-motion'

export default function Slider(){
return(
    <div>
        <motion.div className = 'carousel'>
            <motion.div className = 'inner-carousel'>
                {
                    //map> 
                    <motion.div className = 'item'>
                        <img />
                    </motion.div>
                }
            </motion.div>
        </motion.div>
    </div>
)    
}
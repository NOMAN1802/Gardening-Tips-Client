/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import Container from '../Container/Container';

type TPageTitle = {
    heading: string,
    subHeading: string,
}
 

const PageTitle = ({ heading, subHeading } : TPageTitle ) => {
    return (
        <Container>
            <motion.div

      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
            
            > 
                <div className='mx-auto text-center md:w-4/12 my-[60px]'>
                    <h3  className='text-4xl  text-default-900 py-4'>{heading}</h3>
                    <p  className='text-center mt-2 italic text-default-600'>{subHeading}</p>
                </div>
            </motion.div>
        </Container>
    );
};

export default PageTitle;
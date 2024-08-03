import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import { frequentQuestionsSales } from '../Ayuda/frequentQuestionsSales';
import { customColors } from     './SuperAILandingPage';

const PreguntasFrecuentes: React.FC = () => {
  const [expandedPanel, setExpandedPanel] = useState<number | false>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        backgroundColor: customColors.lightGreen,
        py: { xs: 6, md: 10 },
        borderRadius: 4,
        boxShadow: 3
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          align="center" 
          sx={{ 
            fontWeight: 'bold', 
            color: customColors.darkGray, 
            mb: { xs: 4, sm: 5, md: 6 },
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Preguntas Frecuentes
        </Typography>
        <Box sx={{ mt: 4 }}>
          {frequentQuestionsSales.map((faq, index) => (
            <Accordion 
              key={index}
              expanded={expandedPanel === index}
              onChange={handleChange(index)}
              sx={{
                mb: 2,
                border: 'none',
                '&:before': {
                  display: 'none',
                },
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: customColors.blue }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0',
                  }
                }}
              >
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    color: customColors.darkGray
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AnimatePresence>
                  {expandedPanel === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography 
                        sx={{ 
                          color: customColors.darkGray,
                          lineHeight: 1.6
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PreguntasFrecuentes;
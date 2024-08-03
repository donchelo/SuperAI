import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { customColors } from './SuperAILandingPage';
import { frequentQuestions } from '../Ayuda/frequentQuestions';

const PreguntasFrecuentes: React.FC = () => {
  return (
    <Box sx={{ mb: 12 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray, mb: 6 }}>
        Preguntas Frecuentes
      </Typography>
      {frequentQuestions.map((faq, index) => (
        <Accordion key={index} sx={{ 
          '&:before': { display: 'none' }, 
          boxShadow: 'none', 
          borderBottom: `1px solid ${customColors.lightGray}`,
          '&:last-child': { borderBottom: 'none' }
        }}>
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: customColors.blue }} />}
            sx={{ 
              '&.Mui-expanded': { 
                minHeight: 48,
                '& .MuiAccordionSummary-content': { marginY: '12px' }
              }
            }}
          >
            <Typography sx={{ fontWeight: 'bold', color: customColors.darkGray }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: customColors.darkGray }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default PreguntasFrecuentes;
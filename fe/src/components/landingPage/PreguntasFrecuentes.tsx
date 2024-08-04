import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Fade,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import { frequentQuestionsSales, FrequentQuestion } from './frequentQuestionsSales';

const PreguntasFrecuentes: React.FC = () => {
  const [expandedPanel, setExpandedPanel] = useState<number | false>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Typography variant={isMobile ? 'h4' : 'h2'} align="center" gutterBottom>
        Preguntas Frecuentes
      </Typography>
      <Box component={motion.div}>
        {frequentQuestionsSales.map((faq: FrequentQuestion, index: number) => (
          <Accordion
            key={index}
            expanded={expandedPanel === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default PreguntasFrecuentes;

import React from 'react';
import { Typography, Box, Container, Link, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PoliticaPrivacidad: React.FC = () => {
  const BotonVolver = () => (
    <Button
      component={RouterLink}
      to="/"
      startIcon={<ArrowBackIcon />}
      variant="contained"
      sx={{ mb: 2 }}
    >
      Volver al Inicio
    </Button>
  );

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <BotonVolver />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Política de Privacidad de SuperAI Empresarial
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          1. Introducción
        </Typography>
        <Typography paragraph>
          En SuperAI Empresarial, respetamos su privacidad y nos comprometemos a proteger su información personal. Esta política de privacidad describe cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestros servicios.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Información que Recopilamos
        </Typography>
        <Typography paragraph>
          Podemos recopilar y procesar la siguiente información personal:
        </Typography>
        <Typography component="ul">
          <li>Información de Contacto: Nombre, dirección de correo electrónico, número de teléfono y dirección física.</li>
          <li>Información de Cuenta: Nombre de usuario, contraseña y detalles de la cuenta.</li>
          <li>Datos de Uso: Información sobre cómo interactúa con nuestro servicio, incluyendo direcciones IP, tipo de navegador, páginas visitadas, tiempo en cada página y acciones realizadas.</li>
          <li>Datos Transaccionales: Detalles de pagos y transacciones realizadas a través de nuestros servicios.</li>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Uso de la Información
        </Typography>
        <Typography paragraph>
          Utilizamos la información recopilada para:
        </Typography>
        <Typography component="ul">
          <li>Proveer y Mejorar Servicios: Administrar su cuenta, proporcionar nuestros servicios y mejorar su experiencia de usuario.</li>
          <li>Comunicaciones: Enviar notificaciones, actualizaciones y otra información relevante sobre nuestros servicios.</li>
          <li>Marketing: Enviar materiales promocionales, ofertas especiales y otra información que pueda ser de su interés, siempre y cuando haya dado su consentimiento para recibir estas comunicaciones.</li>
          <li>Seguridad: Proteger la integridad y seguridad de nuestros servicios y prevenir fraudes.</li>
          <li>Cumplimiento Legal: Cumplir con nuestras obligaciones legales y regulatorias.</li>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Compartir Información
        </Typography>
        <Typography paragraph>
          No compartimos su información personal con terceros, excepto en los siguientes casos:
        </Typography>
        <Typography component="ul">
          <li>Proveedores de Servicios: Podemos compartir su información con proveedores de servicios de confianza que nos ayudan a operar y mejorar nuestro servicio.</li>
          <li>Cumplimiento Legal: Podemos divulgar su información para cumplir con leyes aplicables, regulaciones, procesos legales o solicitudes gubernamentales.</li>
          <li>Transferencias Comerciales: En caso de una fusión, adquisición o venta de activos, su información puede ser transferida como parte de esa transacción.</li>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Seguridad de la Información
        </Typography>
        <Typography paragraph>
          Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra pérdida, uso indebido, acceso no autorizado, divulgación, alteración y destrucción. Sin embargo, ningún sistema de seguridad es infalible, y no podemos garantizar la seguridad absoluta de su información.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Retención de Datos
        </Typography>
        <Typography paragraph>
          Retendremos su información personal solo durante el tiempo necesario para cumplir con los fines para los cuales fue recopilada, incluidos los fines de cumplir con cualquier requisito legal, contable o de informes.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. Sus Derechos
        </Typography>
        <Typography paragraph>
          Usted tiene derecho a:
        </Typography>
        <Typography component="ul">
          <li>Acceso: Solicitar una copia de la información personal que tenemos sobre usted.</li>
          <li>Rectificación: Solicitar la corrección de cualquier información inexacta o incompleta.</li>
          <li>Eliminación: Solicitar la eliminación de su información personal cuando ya no sea necesaria para los fines para los que fue recopilada.</li>
          <li>Restricción: Solicitar la restricción del procesamiento de su información personal en ciertas circunstancias.</li>
          <li>Portabilidad: Solicitar que le proporcionemos su información personal en un formato estructurado, de uso común y legible por máquina.</li>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          8. Cookies y Tecnologías Similares
        </Typography>
        <Typography paragraph>
          Utilizamos cookies y tecnologías similares para recopilar datos sobre su uso de nuestro servicio y para mejorar su experiencia en línea. Puede configurar su navegador para rechazar todas o algunas cookies, o para alertarlo cuando se envíen cookies.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          9. Cambios a esta Política de Privacidad
        </Typography>
        <Typography paragraph>
          Podemos actualizar esta política de privacidad de vez en cuando. Cualquier cambio se publicará en esta página con una fecha de revisión actualizada. Le recomendamos que revise esta política periódicamente para estar informado sobre cómo protegemos su información.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          10. Contacto
        </Typography>
        <Typography paragraph>
          Si tiene alguna pregunta o inquietud sobre esta política de privacidad o sobre nuestras prácticas de privacidad, contáctenos en:
        </Typography>
        <Typography component="ul">
          <li>Correo Electrónico: <Link href="mailto:chelo@ai4u.com.co">chelo@ai4u.com.co</Link></li>
          <li>Teléfono: +57 321 817 5744</li>
        </Typography>

        <Box mt={4}>
          <BotonVolver />
        </Box>
      </Box>
    </Container>
  );
};

export default PoliticaPrivacidad;
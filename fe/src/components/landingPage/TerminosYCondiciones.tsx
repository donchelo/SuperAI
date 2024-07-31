import React from 'react';
import { Typography, Box, Container, Link, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TerminosYCondiciones: React.FC = () => {
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
          Términos y Condiciones de SuperAI Empresarial
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          1. Aceptación de los Términos
        </Typography>
        <Typography paragraph>
          Al acceder y utilizar los servicios de SuperAI Empresarial, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con estos términos, no utilice nuestros servicios.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Descripción del Servicio
        </Typography>
        <Typography paragraph>
          SuperAI Empresarial proporciona soluciones de inteligencia artificial para empresas, incluyendo análisis predictivo, integración de datos y optimización de procesos. Nos reservamos el derecho de modificar o descontinuar el servicio en cualquier momento sin previo aviso.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Uso del Servicio
        </Typography>
        <Typography component="div">
          <ul>
            <li><strong>Licencia:</strong> Le otorgamos una licencia limitada, no exclusiva, intransferible y revocable para utilizar nuestros servicios según estos términos.</li>
            <li><strong>Prohibiciones:</strong> No puede utilizar el servicio para actividades ilegales, infringir los derechos de otros, o interferir con la operatividad del servicio.</li>
          </ul>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Registro de Usuarios
        </Typography>
        <Typography paragraph>
          Para acceder a ciertas funcionalidades, puede ser necesario registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de cuenta y de todas las actividades que ocurran bajo su cuenta.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Privacidad
        </Typography>
        <Typography paragraph>
          Su privacidad es importante para nosotros. Por favor, revise nuestra <Link href="/politica-de-privacidad">Política de Privacidad</Link> para entender cómo recopilamos, utilizamos y protegemos su información personal.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Propiedad Intelectual
        </Typography>
        <Typography paragraph>
          Todos los contenidos y materiales disponibles en SuperAI Empresarial, incluyendo pero no limitándose a textos, gráficos, logotipos y software, son propiedad de la empresa o sus licenciantes y están protegidos por derechos de autor y otras leyes de propiedad intelectual.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. Limitación de Responsabilidad
        </Typography>
        <Typography paragraph>
          En la máxima medida permitida por la ley aplicable, SuperAI Empresarial no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles, resultante de:
        </Typography>
        <Typography component="div">
          <ul>
            <li>Su acceso o uso o incapacidad para acceder o usar el servicio;</li>
            <li>Cualquier conducta o contenido de terceros en el servicio;</li>
            <li>Cualquier contenido obtenido del servicio; y</li>
            <li>Acceso, uso o alteración no autorizados de sus transmisiones o contenido.</li>
          </ul>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          8. Indemnización
        </Typography>
        <Typography paragraph>
          Usted se compromete a indemnizar y eximir de responsabilidad a SuperAI Empresarial y sus afiliados, directores, empleados y agentes de cualquier reclamo, pérdida, daño, responsabilidad y costo (incluidos los honorarios de abogados) que surjan de su uso del servicio, su violación de estos términos, o su violación de cualquier derecho de un tercero.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          9. Modificaciones a los Términos
        </Typography>
        <Typography paragraph>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones serán efectivas cuando se publiquen en nuestro sitio web. Su uso continuado del servicio después de la publicación de los términos modificados constituirá su aceptación de dichos términos.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          10. Terminación
        </Typography>
        <Typography paragraph>
          Nos reservamos el derecho de suspender o terminar su acceso al servicio en cualquier momento, sin previo aviso y por cualquier motivo, incluyendo el incumplimiento de estos términos.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          11. Ley Aplicable
        </Typography>
        <Typography paragraph>
          Estos términos se regirán e interpretarán de acuerdo con las leyes del país en el que se encuentra nuestra empresa, sin tener en cuenta los principios de conflictos de leyes.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          12. Contacto
        </Typography>
        <Typography paragraph>
          Para cualquier pregunta sobre estos términos, por favor contáctenos en <Link href="mailto:contacto@superai.com">contacto@superai.com</Link> o en nuestra dirección física: Calle Ejemplo 123, Ciudad Ejemplo, País Ejemplo.
        </Typography>

        <Box mt={4}>
          <BotonVolver />
        </Box>
      </Box>
    </Container>
  );
};

export default TerminosYCondiciones;
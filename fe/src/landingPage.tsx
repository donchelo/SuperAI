import React from 'react';
import { ArrowRight, BarChart, Layout, Database, Bell, Zap, CheckCircle } from 'lucide-react';

// Definimos la paleta de colores de AI4U
const colors = {
  darkGray: '#282728',
  white: '#FFFFFF',
  lightGray: '#94989B',
  orange: '#FC8E46',
  lightGreen: '#EAF4EB',
  blue: '#20A6D2'
};

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-start mb-8 hover:bg-blue-50 p-4 rounded-lg transition-colors">
    <Icon className="text-blue mr-4 flex-shrink-0" size={24} style={{color: colors.blue}} />
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const ValueItem = ({ children }) => (
  <div className="flex items-center mb-4">
    <CheckCircle className="mr-2 flex-shrink-0" size={20} style={{color: colors.orange}} />
    <span>{children}</span>
  </div>
);

const SuperAILandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800" style={{color: colors.darkGray}}>
      {/* Header */}
      <header className="py-20" style={{backgroundColor: colors.lightGreen}}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6" style={{color: colors.darkGray}}>SuperAI Empresarial</h1>
          <p className="text-xl mb-8">Transformando el liderazgo empresarial mediante la inteligencia artificial</p>
          <button className="px-8 py-4 rounded-full font-medium transition-colors text-lg text-white" 
                  style={{backgroundColor: colors.blue, hover: {backgroundColor: colors.orange}}}>
            Solicitar Demo <ArrowRight className="inline-block ml-2" size={20} />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Propuesta de Valor */}
        <section className="mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Decisiones Infalibles. Resultados Imprescindibles.</h2>
          <p className="text-xl leading-relaxed">
            SuperAI Empresarial empodera a los CEOs con una superinteligencia artificial avanzada que ofrece
            insights profundos e integrados, optimizando cada aspecto de su negocio para tomar
            decisiones informadas y estratégicas con confianza y precisión.
          </p>
        </section>

        {/* Valores de la Marca */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueItem>Precisión en cada dato y análisis</ValueItem>
            <ValueItem>Proactividad en recomendaciones</ValueItem>
            <ValueItem>Integración completa de sistemas</ValueItem>
            <ValueItem>Innovación constante</ValueItem>
            <ValueItem>Transparencia absoluta</ValueItem>
            <ValueItem>Crecimiento sostenible</ValueItem>
          </div>
        </section>

        {/* Funcionalidades Clave */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Funcionalidades Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureItem
              icon={BarChart}
              title="Análisis Predictivo en Tiempo Real"
              description="Realice predicciones precisas sobre tendencias del mercado y tome decisiones informadas con datos actualizados constantemente."
            />
            <FeatureItem
              icon={Layout}
              title="Paneles de Control Personalizables"
              description="Visualice sus KPIs clave en dashboards intuitivos y personalizables, obteniendo una visión clara del rendimiento de su negocio."
            />
            <FeatureItem
              icon={Database}
              title="Integración de Datos"
              description="Unifique todas sus fuentes de datos en una sola plataforma, eliminando silos de información y proporcionando una visión holística del negocio."
            />
            <FeatureItem
              icon={Bell}
              title="Alertas y Notificaciones Proactivas"
              description="Reciba alertas automáticas sobre eventos críticos, desviaciones de rendimiento y nuevas oportunidades de negocio."
            />
            <FeatureItem
              icon={Zap}
              title="Optimización de Recursos"
              description="Maximice la eficiencia de sus recursos humanos, financieros y tecnológicos con nuestros algoritmos de optimización avanzados."
            />
          </div>
        </section>

        {/* Testimonios */}
        <section className="mb-20 py-12 px-4 rounded-lg" style={{backgroundColor: colors.lightGray}}>
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonios</h2>
          <div className="max-w-4xl mx-auto">
            <blockquote className="mb-8 text-center italic">
              <p className="text-xl mb-4">"SuperAI Empresarial ha transformado nuestra toma de decisiones. La precisión y rapidez con la que ahora anticipamos tendencias y optimizamos operaciones es asombrosa."</p>
              <footer className="font-medium">- María Rodríguez, CEO de TechInnovate</footer>
            </blockquote>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center py-16 px-4 rounded-lg" style={{backgroundColor: colors.blue, color: colors.white}}>
          <h2 className="text-3xl font-bold mb-4">¿Listo para Revolucionar su Toma de Decisiones?</h2>
          <p className="text-xl mb-8">Únase a las empresas líderes que ya están aprovechando el poder de SuperAI Empresarial.</p>
          <button className="px-8 py-4 rounded-full font-medium transition-colors text-lg" 
                  style={{backgroundColor: colors.orange, color: colors.white, hover: {backgroundColor: colors.darkGray}}}>
            Solicitar Demostración Personalizada <ArrowRight className="inline-block ml-2" size={20} />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-16" style={{backgroundColor: colors.lightGray}}>
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 SuperAI Empresarial. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:underline" style={{color: colors.blue}}>Política de Privacidad</a>
            <a href="#" className="hover:underline" style={{color: colors.blue}}>Términos y Condiciones</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperAILandingPage;
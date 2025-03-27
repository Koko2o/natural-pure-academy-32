
import { useEffect, useRef } from "react";

// Composant pour créer un effet de laboratoire scientifique
// Ajoute des effets visuels subtils qui renforcent l'impression d'analyse scientifique
export const LabEffects = ({ active = true }: { active?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Définir les dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Réinitialiser le canvas lors du redimensionnement
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Créer les particules pour l'effet "laboratoire"
    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
    }
    
    const particles: Particle[] = [];
    
    // Générer des particules avec différentes propriétés
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.2 + 0.1,
        color: getRandomColor()
      });
    }
    
    // Générer des couleurs scientifiques aléatoires
    function getRandomColor() {
      const colors = [
        "rgba(63, 81, 181, X)", // Indigo
        "rgba(30, 136, 229, X)", // Bleu
        "rgba(121, 134, 203, X)", // Violet clair
        "rgba(156, 39, 176, X)", // Violet
        "rgba(0, 137, 123, X)", // Teal
      ];
      
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      return selectedColor.replace("X", (Math.random() * 0.3 + 0.05).toString());
    }
    
    // Fonction d'animation
    const animate = () => {
      // Effacer avec un effet de traînée
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Mettre à jour et dessiner les particules
      particles.forEach(particle => {
        // Déplacer vers le haut
        particle.y -= particle.speed;
        
        // Réinitialiser si hors de l'écran
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        
        // Ajouter un peu de mouvement horizontal
        particle.x += Math.sin(particle.y * 0.01) * 0.2;
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Ajouter des lignes de connexion occasionnellement
      if (Math.random() > 0.97) {
        const startParticle = particles[Math.floor(Math.random() * particles.length)];
        const endParticle = particles[Math.floor(Math.random() * particles.length)];
        
        ctx.beginPath();
        ctx.moveTo(startParticle.x, startParticle.y);
        ctx.lineTo(endParticle.x, endParticle.y);
        ctx.strokeStyle = "rgba(99, 102, 241, 0.1)";
        ctx.stroke();
      }
      
      // Continuer l'animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Démarrer l'animation
    animate();
    
    // Nettoyer
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3, zIndex: -1 }}
    />
  );
};

export default LabEffects;

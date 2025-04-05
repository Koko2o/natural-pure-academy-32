
import { useEffect, useRef } from "react";

// Composant pour créer un effet de laboratoire scientifique
// Ajoute des effets visuels subtils qui renforcent l'impression d'analyse scientifique
export const LabEffects = ({ 
  active = true, 
  density = 50,
  speed = 1,
  colors = ["indigo", "blue", "purple", "teal"]
}: { 
  active?: boolean; 
  density?: number;
  speed?: number;
  colors?: string[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isUnmountedRef = useRef(false);
  
  useEffect(() => {
    // Marquer comme non démonté au montage
    isUnmountedRef.current = false;
    
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Définir les dimensions
    const setCanvasDimensions = () => {
      if (canvas && !isUnmountedRef.current) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    setCanvasDimensions();
    
    // Réinitialiser le canvas lors du redimensionnement
    const handleResize = () => {
      setCanvasDimensions();
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
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: (Math.random() * 0.3 + 0.1) * speed,
        opacity: Math.random() * 0.2 + 0.1,
        color: getRandomColor()
      });
    }
    
    // Générer des couleurs scientifiques aléatoires
    function getRandomColor() {
      const colorMap: Record<string, string> = {
        "indigo": "rgba(63, 81, 181, X)",
        "blue": "rgba(30, 136, 229, X)",
        "purple": "rgba(156, 39, 176, X)",
        "teal": "rgba(0, 137, 123, X)",
        "cyan": "rgba(0, 188, 212, X)",
        "green": "rgba(76, 175, 80, X)"
      };
      
      const selectedColor = colorMap[colors[Math.floor(Math.random() * colors.length)]] || colorMap["indigo"];
      return selectedColor.replace("X", (Math.random() * 0.3 + 0.05).toString());
    }
    
    // Fonction d'animation
    const animate = () => {
      // Vérifier si le composant est démonté pour éviter les fuites mémoire
      if (isUnmountedRef.current || !ctx || !canvas) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }
      
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
      if (!isUnmountedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Démarrer l'animation
    if (!isUnmountedRef.current) {
      animate();
    }
    
    // Nettoyer
    return () => {
      // Marquer comme démonté pour arrêter les animations
      isUnmountedRef.current = true;
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [active, density, speed, colors]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3, zIndex: -1 }}
      aria-hidden="true"
    />
  );
};

export default LabEffects;
import React, { useEffect, useRef } from 'react';

interface LabEffectsProps {
  density?: number;
  speed?: number;
  isMobile?: boolean;
}

const LabEffects: React.FC<LabEffectsProps> = ({ 
  density = 30, 
  speed = 1.5,
  isMobile = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas à la fenêtre
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Réduire la densité sur mobile
    const particleCount = isMobile ? Math.floor(density / 2) : density;
    
    // Créer les particules
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, ctx, speed));
    }
    
    // Créer les "bubbles" pour l'effet de laboratoire
    const bubbles: Bubble[] = [];
    const bubbleCount = isMobile ? 10 : 25;
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble(canvas, ctx));
    }
    
    // Animation loop
    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner un fond subtil
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(250, 245, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(240, 240, 250, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner des lignes de grille subtiles
      ctx.strokeStyle = 'rgba(100, 50, 200, 0.05)';
      ctx.lineWidth = 0.5;
      
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Mettre à jour et dessiner les particules
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Mettre à jour et dessiner les bulles
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });
      
      // Dessiner l'effet "flacon" scientifique
      // Use a different function or render a different lab item
      drawBeaker(ctx, canvas.width - 100, canvas.height - 150, 80, 120);
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, isMobile]);
  
  // Fonction pour dessiner un flacon de laboratoire
  const drawBeaker = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) => {
    // Dessiner le corps du flacon
    ctx.fillStyle = 'rgba(130, 90, 230, 0.1)';
    ctx.strokeStyle = 'rgba(130, 90, 230, 0.3)';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    // Goulot
    ctx.moveTo(x - width/6, y);
    ctx.lineTo(x + width/6, y);
    // Épaules
    ctx.lineTo(x + width/2, y + height/3);
    // Corps
    ctx.lineTo(x + width/2, y + height);
    ctx.lineTo(x - width/2, y + height);
    ctx.lineTo(x - width/2, y + height/3);
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
    
    // Dessiner du liquide dans le flacon
    const liquidHeight = height * 0.6;
    ctx.fillStyle = 'rgba(130, 90, 230, 0.15)';
    
    ctx.beginPath();
    ctx.moveTo(x - width/2, y + height - liquidHeight);
    ctx.lineTo(x + width/2, y + height - liquidHeight);
    ctx.lineTo(x + width/2, y + height);
    ctx.lineTo(x - width/2, y + height);
    ctx.closePath();
    
    ctx.fill();
    
    // Dessiner des bulles dans le liquide
    for (let i = 0; i < 8; i++) {
      const bubbleX = x - width/2 + Math.random() * width;
      const bubbleY = y + height - liquidHeight + Math.random() * liquidHeight;
      const bubbleSize = 2 + Math.random() * 4;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

// Classe pour les particules
class Particle {
  private x: number;
  private y: number;
  private size: number;
  private speedX: number;
  private speedY: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private color: string;
  private shape: 'circle' | 'square' | 'triangle';
  private opacity: number;
  private speedFactor: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speedFactor: number) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * speedFactor;
    this.speedY = (Math.random() - 0.5) * speedFactor;
    this.speedFactor = speedFactor;
    
    // Choisir aléatoirement une forme
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Couleurs en teintes de violet et bleu
    const colors = [
      'rgba(130, 90, 230, ',
      'rgba(90, 120, 230, ',
      'rgba(140, 70, 190, ',
    ];
    
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Rebond sur les bords
    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    
    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
    
    // Légère variation de vitesse pour un mouvement plus naturel
    this.speedX += (Math.random() - 0.5) * 0.01;
    this.speedY += (Math.random() - 0.5) * 0.01;
    
    // Limiter la vitesse maximale
    const maxSpeed = this.speedFactor * 1.5;
    if (Math.abs(this.speedX) > maxSpeed) {
      this.speedX = Math.sign(this.speedX) * maxSpeed;
    }
    if (Math.abs(this.speedY) > maxSpeed) {
      this.speedY = Math.sign(this.speedY) * maxSpeed;
    }
  }

  draw() {
    this.ctx.fillStyle = `${this.color}${this.opacity})`;
    
    if (this.shape === 'circle') {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (this.shape === 'square') {
      this.ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    } else if (this.shape === 'triangle') {
      const height = this.size * 1.732; // hauteur d'un triangle équilatéral
      
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y - this.size);
      this.ctx.lineTo(this.x - this.size, this.y + height/2);
      this.ctx.lineTo(this.x + this.size, this.y + height/2);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}

// Classe pour les bulles (effet de laboratoire)
class Bubble {
  private x: number;
  private y: number;
  private size: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private speed: number;
  private opacity: number;
  private hue: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 10 + 2;
    this.speed = Math.random() * 2 + 0.5;
    this.opacity = Math.random() * 0.3 + 0.1;
    this.hue = Math.random() * 60 + 240; // teintes entre bleu et violet
  }

  update() {
    this.y -= this.speed;
    
    // Réinitialiser si la bulle sort du haut
    if (this.y < -this.size * 2) {
      this.y = this.canvas.height + Math.random() * 100;
      this.x = Math.random() * this.canvas.width;
    }
    
    // Ajouter un léger mouvement horizontal
    this.x += Math.sin(this.y * 0.01) * 0.5;
  }

  draw() {
    // Dessiner la bulle avec un dégradé
    const gradient = this.ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    
    gradient.addColorStop(0, `hsla(${this.hue}, 70%, 80%, ${this.opacity})`);
    gradient.addColorStop(0.8, `hsla(${this.hue}, 70%, 60%, ${this.opacity * 0.8})`);
    gradient.addColorStop(1, `hsla(${this.hue}, 70%, 50%, 0)`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Ajouter un petit reflet
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.7})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export default LabEffects;

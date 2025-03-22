
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import InstagramCTA from '@/components/InstagramCTA';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Article = () => {
  const { id } = useParams<{ id: string }>();

  // Mock article data
  const article = {
    id: id || "1",
    title: "Les antioxydants : comment ils protègent vos cellules et ralentissent le vieillissement",
    excerpt: "Une analyse approfondie des différents antioxydants, leur mécanisme d'action au niveau cellulaire et les preuves scientifiques de leur efficacité contre le stress oxydatif.",
    content: `
      <p class="lead">Les antioxydants sont souvent présentés comme des molécules miraculeuses dans le domaine de la santé et de la beauté. Mais que dit réellement la science à leur sujet ? Comment fonctionnent-ils au niveau cellulaire et quels sont ceux dont l'efficacité est prouvée ?</p>
      
      <h2>Qu'est-ce que le stress oxydatif ?</h2>
      <p>Pour comprendre l'importance des antioxydants, il faut d'abord saisir ce qu'est le stress oxydatif. À chaque instant, notre corps produit des radicaux libres dans le cadre de processus métaboliques normaux, notamment lors de la respiration cellulaire et de la production d'énergie. Ces radicaux libres sont des molécules instables qui possèdent un électron non apparié, ce qui les rend très réactifs.</p>
      
      <p>En temps normal, notre organisme maintient un équilibre entre la production de radicaux libres et leur neutralisation. Cependant, lorsque cet équilibre est perturbé, soit par une production excessive de radicaux libres, soit par une diminution des défenses antioxydantes, on parle de stress oxydatif.</p>
      
      <blockquote>
        <p>"Le stress oxydatif n'est pas seulement lié au vieillissement prématuré, mais également à plus de 200 pathologies allant des maladies cardiovasculaires aux troubles neurodégénératifs."</p>
        <cite>— Pr. Maria Rodriguez, Université de Barcelone</cite>
      </blockquote>

      <h2>Le mécanisme d'action des antioxydants</h2>
      <p>Les antioxydants ont la capacité de neutraliser les radicaux libres sans devenir eux-mêmes instables. Ils agissent principalement de trois façons :</p>
      
      <ul>
        <li><strong>Don d'électrons</strong> : Certains antioxydants, comme la vitamine C, peuvent donner un électron aux radicaux libres, les stabilisant ainsi sans devenir eux-mêmes des radicaux.</li>
        <li><strong>Chélation des métaux</strong> : D'autres antioxydants, comme certains polyphénols, peuvent se lier aux ions métalliques qui catalysent les réactions oxydatives.</li>
        <li><strong>Régulation enzymatique</strong> : Certains antioxydants stimulent l'expression de gènes codant pour des enzymes antioxydantes comme la superoxyde dismutase (SOD) ou la catalase.</li>
      </ul>

      <h2>Les antioxydants les plus efficaces selon la science</h2>
      
      <h3>1. La Vitamine C (Acide ascorbique)</h3>
      <p>La vitamine C est l'un des antioxydants les plus étudiés. Hydrosoluble, elle circule librement dans le compartiment aqueux des cellules et du plasma sanguin. Des études cliniques ont démontré son efficacité pour :</p>
      <ul>
        <li>Réduire la peroxydation lipidique</li>
        <li>Protéger l'ADN des dommages oxydatifs</li>
        <li>Régénérer la vitamine E oxydée</li>
      </ul>
      
      <p>Une méta-analyse de 2019 publiée dans le Journal of Clinical Medicine a confirmé qu'une supplémentation quotidienne de 500 mg de vitamine C réduisait significativement les marqueurs de stress oxydatif chez les adultes en bonne santé.</p>

      <h3>2. La Vitamine E (Tocophérols et Tocotriénols)</h3>
      <p>Liposoluble, la vitamine E protège principalement les membranes cellulaires contre la peroxydation lipidique. Les huit formes de vitamine E (quatre tocophérols et quatre tocotriénols) ont des activités antioxydantes variables, l'alpha-tocophérol étant la forme la plus active chez l'humain.</p>
      
      <h3>3. Le Glutathion</h3>
      <p>Souvent appelé "maître antioxydant", le glutathion est produit naturellement par notre corps. Il joue un rôle central dans :</p>
      <ul>
        <li>La détoxification des xénobiotiques</li>
        <li>La régénération des vitamines C et E</li>
        <li>La maintenance du potentiel redox intracellulaire</li>
      </ul>

      <h2>Synergie entre antioxydants : l'importance d'une approche holistique</h2>
      <p>Les recherches récentes suggèrent que les antioxydants fonctionnent mieux ensemble que séparément. Par exemple, la vitamine C peut régénérer la vitamine E oxydée, tandis que le glutathion peut régénérer la vitamine C. Cette "chaîne antioxydante" maximise l'efficacité protective globale.</p>
      
      <blockquote>
        <p>"Prendre un seul antioxydant à forte dose n'est pas aussi efficace que consommer un éventail équilibré d'antioxydants par l'alimentation ou une supplémentation bien pensée."</p>
        <cite>— Dr. Jean-Marc Durand, Université de Lausanne</cite>
      </blockquote>

      <h2>Sources naturelles et compléments : que privilégier ?</h2>
      <p>Bien que les compléments alimentaires puissent aider à augmenter l'apport en antioxydants, les études épidémiologiques montrent systématiquement que les personnes consommant une alimentation riche en fruits et légumes ont de meilleurs résultats en termes de santé que celles prenant des suppléments isolés.</p>
      
      <p>Cela s'explique par plusieurs facteurs :</p>
      <ul>
        <li>La présence de co-facteurs naturels dans les aliments qui améliorent l'absorption et l'efficacité</li>
        <li>La diversité des antioxydants présents dans les aliments entiers</li>
        <li>La présence de composés bioactifs encore méconnus qui agissent en synergie</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Les antioxydants jouent un rôle crucial dans la protection de nos cellules contre les dommages oxydatifs. Toutefois, leur efficacité dépend de nombreux facteurs, notamment leur type, leur dosage, leur biodisponibilité et leur action synergique.</p>
      
      <p>Pour optimiser les bénéfices des antioxydants, privilégiez une alimentation variée riche en fruits, légumes, noix et graines de qualité. Si vous envisagez une supplémentation, consultez un professionnel de santé pour déterminer les antioxydants les plus adaptés à vos besoins spécifiques.</p>
    `,
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200&h=600",
    date: "15 Juin 2023",
    readTime: "8 min de lecture",
    author: {
      name: "Dr. Sophie Laurent",
      role: "Chercheuse en Nutrition",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    }
  };

  // Related articles based on category
  const relatedArticles = [
    {
      id: "2",
      title: "Les bienfaits prouvés des polyphénols du thé vert",
      excerpt: "Une exploration des mécanismes par lesquels les catéchines du thé vert exercent leurs effets antioxydants et anti-inflammatoires.",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=800&h=600",
      date: "10 Juin 2023",
      readTime: "6 min de lecture"
    },
    {
      id: "3",
      title: "Microbiote intestinal : le lien avec l'inflammation chronique",
      excerpt: "Comment l'équilibre de notre flore intestinale influence les processus inflammatoires et le stress oxydatif à l'échelle de l'organisme.",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&q=80&w=800&h=600",
      date: "5 Juin 2023",
      readTime: "7 min de lecture"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <article className="flex-grow pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-natural-800 opacity-60"></div>
          <div className="relative h-[50vh] max-h-[500px] w-full flex items-end">
            <img 
              src={article.image} 
              alt={article.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="container mx-auto px-4 py-12 relative z-10">
              <Link to="/articles" className="inline-flex items-center text-white mb-4 hover:text-natural-200 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
              </Link>
              <div className="max-w-3xl">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center space-x-6 text-white/90">
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Author */}
              <div className="flex items-center mb-8 p-4 glass rounded-lg">
                <img 
                  src={article.author.image} 
                  alt={article.author.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-medium text-lg">{article.author.name}</h3>
                  <p className="text-sm text-muted-foreground">{article.author.role}</p>
                </div>
              </div>

              {/* Content */}
              <div 
                className="prose prose-natural lg:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-display text-lg font-medium mb-4">Partager cet article</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Instagram CTA Mini */}
                <div className="glass rounded-lg p-6 text-center">
                  <div className="inline-flex items-center justify-center p-2 bg-natural-100 rounded-full mb-4">
                    <Instagram className="h-5 w-5 text-natural-700" />
                  </div>
                  <h3 className="font-display text-xl font-medium mb-2">Suivez-nous</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rejoignez notre communauté pour plus de contenu sur la santé naturelle basée sur la science.
                  </p>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700">
                      <Instagram className="h-4 w-4 mr-2" />
                      Suivre @NaturalAndPure
                    </Button>
                  </a>
                </div>

                {/* Table of Contents */}
                <div className="glass rounded-lg p-6">
                  <h3 className="font-display text-xl font-medium mb-4">Dans cet article</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-natural-600 hover:text-natural-700 transition-colors">
                        Qu'est-ce que le stress oxydatif ?
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-natural-600 hover:text-natural-700 transition-colors">
                        Le mécanisme d'action des antioxydants
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-natural-600 hover:text-natural-700 transition-colors">
                        Les antioxydants les plus efficaces selon la science
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-natural-600 hover:text-natural-700 transition-colors">
                        Synergie entre antioxydants
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-natural-600 hover:text-natural-700 transition-colors">
                        Sources naturelles et compléments
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-natural-600 hover:text-natural-700 transition-colors">
                        Conclusion
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-medium mb-8">Articles connexes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                {...article} 
                className={`slide-up delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default Article;

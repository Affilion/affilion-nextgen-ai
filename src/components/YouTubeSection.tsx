import { motion } from "framer-motion";

const videos = [
  { id: "dQw4w9WgXcQ", title: "AI Zene generálás bemutató" },
  { id: "dQw4w9WgXcQ", title: "Midjourney tippek és trükkök" },
  { id: "dQw4w9WgXcQ", title: "Automatizáció a mindennapokban" },
];

const YouTubeSection = () => (
  <section id="youtube" className="py-24 px-4">
    <div className="container mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title text-center mb-16"
      >
        Legújabb <span className="glow-text">AI Kísérleteim</span>
      </motion.h2>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* First video - large */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 md:row-span-2 glass-card-hover overflow-hidden"
        >
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full rounded-t-xl"
              src={`https://www.youtube.com/embed/${videos[0].id}`}
              title={videos[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground">{videos[0].title}</h3>
          </div>
        </motion.div>

        {/* Smaller videos */}
        {videos.slice(1).map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card-hover overflow-hidden"
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full rounded-t-xl"
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground">{v.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default YouTubeSection;

import { motion } from "framer-motion";
import productPrompts from "@/assets/product-prompts.png";
import productSuno from "@/assets/product-suno.png";
import productAuto from "@/assets/product-auto.png";

const products = [
  {
    title: "50 AI Prompt Kezdőknek",
    description: "Azonnal használható promptok Midjourney-hez, ChatGPT-hez és DALL·E-hoz.",
    price: "2 990 Ft",
    image: productPrompts,
    link: "#",
  },
  {
    title: "Suno AI Dalszövegírási Titkok",
    description: "Tanulj meg professzionális dalokat generálni mesterséges intelligenciával.",
    price: "3 990 Ft",
    image: productSuno,
    link: "#",
  },
  {
    title: "AI Automatizációs Útmutató",
    description: "Automatizáld a munkafolyamataidat Make, Zapier és AI eszközökkel.",
    price: "4 990 Ft",
    image: productAuto,
    link: "#",
  },
];

const ProductsSection = () => (
  <section id="termekek" className="py-24 px-4">
    <div className="container mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title text-center mb-16"
      >
        Gyorsítsd fel <span className="glow-text">a munkád!</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-hover group flex flex-col overflow-hidden"
          >
            <div className="relative overflow-hidden aspect-square bg-muted/20">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold glow-text">{p.price}</span>
                <a href={p.link} className="neon-button text-sm py-2 px-4">
                  Megveszem
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;

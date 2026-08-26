import {
  ArrowRight,
  Grid3x3,
  ShoppingBag,
  Shield,
  Truck,
  Star,
} from "lucide-react";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import { ProductGridItem } from "./product-grid-item";

export default function HeroSection() {
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBqYWNrZXR8ZW58MXx8fHwxNzY4NzUxMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Fashion Jacket",
      category: "Fashion",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGx8ZW58MXx8fHwxNzY4NzUxMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Power Tools",
      category: "Tools",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1765279360461-e6b8199b906c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBnYWRnZXR8ZW58MXx8fHwxNzY4NzUxMDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wireless Headphones",
      category: "Electronics",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1613384944189-36c9977e607a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBwbGFudHxlbnwxfHx8fDE3Njg2MzkzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Home Decor",
      category: "Home",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3Njg2NTU0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Sneakers",
      category: "Shoes",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1761953881694-b98b238f87bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlJTIwYmxlbmRlcnxlbnwxfHx8fDE3Njg3MjM5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Kitchen Appliance",
      category: "Kitchen",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-neutral-600 via-neutral-700 to-neutral-600">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-500 rounded-full blur-3xl"
      />

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-linear(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:px-8 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div className="text-white space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-none">
                <span className="block">Shop</span>
                <span className="block bg-linear-to-r from-neutral-200 via-white to-neutral-100 bg-clip-text text-transparent">
                  Everything
                </span>
                <span className="block">You Need</span>
              </h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-neutral-100 max-w-xl leading-relaxed"
              >
                From fashion and electronics to tools and home essentials.
                Quality products, unbeatable prices, delivered to your door.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-5 bg-white text-neutral-600 rounded-full transition-all duration-300 shadow-2xl overflow-hidden cursor-pointer"
                >
                  <span className="relative flex items-center justify-center gap-2 text-lg z-10">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Start Shopping</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <button className="group px-8 py-5 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2">
                <Grid3x3 className="w-5 h-5" />
                <span className="text-lg">Browse Categories</span>
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {[
                {
                  icon: Truck,
                  text: "Free Delivery",
                  subtext: "On orders $50+",
                },
                {
                  icon: Shield,
                  text: "Secure Payment",
                  subtext: "100% Protected",
                },
                { icon: Star, text: "4.9/5 Rating", subtext: "50k+ Reviews" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 cursor-default shadow-sm"
                >
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-neutral-400/20 rounded-xl">
                    <item.icon className="w-6 h-6 text-neutral-200" />
                  </div>
                  <div>
                    <div className="text-white font-semibold leading-tight">
                      {item.text}
                    </div>
                    <div className="text-sm text-neutral-200/80 leading-tight mt-1">
                      {item.subtext}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={containerVariants} className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <ProductGridItem
                product={products[0]}
                variants={imageVariants}
                className="col-span-1 row-span-2 min-h-80"
              />

              <ProductGridItem
                product={products[1]}
                variants={imageVariants}
                className="col-span-1 min-h-37.5"
              />

              <ProductGridItem
                product={products[2]}
                variants={imageVariants}
                className="col-span-1 min-h-37.5"
              />

              <ProductGridItem
                product={products[3]}
                variants={imageVariants}
                className="col-span-1 min-h-37.5"
              />

              <div className="col-span-1 grid grid-rows-2 gap-4">
                <ProductGridItem
                  product={products[4]}
                  variants={imageVariants}
                  className="min-h-37.5"
                />
                <ProductGridItem
                  product={products[5]}
                  variants={imageVariants}
                  className="min-h-37.5"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute -bottom-px left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto text-white opacity-100"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            fill="currentColor"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}

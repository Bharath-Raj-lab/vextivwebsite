"use client";

import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Vextiv transformed our digital presence completely. Our restaurant now gets orders from people who found us online — something that never happened before.",
    name: "Arjun Reddy",
    title: "Owner",
    company: "Brew & Co.",
    rating: 5
  },
  {
    id: "t2",
    quote: "The website they built us looked better than anything I'd seen from agencies charging 3× more. Clear process, no surprises.",
    name: "Sneha Kapoor",
    title: "Founder",
    company: "ShopFlow",
    rating: 4
  },
  {
    id: "t3",
    quote: "We went from zero online presence to ranking on Google's first page. The team understood exactly what a local business needs.",
    name: "Vikram Rao",
    title: "Director",
    company: "EstateEdge",
    rating: 5
  },
  {
    id: "t4",
    quote: "Our conversion rates skyrocketed after the redesign. The user experience is flawless, and our customers constantly compliment the new look.",
    name: "Priya Sharma",
    title: "Marketing Head",
    company: "TechNova",
    rating: 5
  },
  {
    id: "t5",
    quote: "Working with Vextiv was a breath of fresh air. They didn't just build a website; they built a revenue engine for our business.",
    name: "Rohan Desai",
    title: "CEO",
    company: "Elevate Logistics",
    rating: 4
  },
  {
    id: "t6",
    quote: "The attention to detail and modern design aesthetic is unmatched. They perfectly captured our brand's luxury identity.",
    name: "Ananya Singh",
    title: "Creative Director",
    company: "Luxe Interiors",
    rating: 5
  },
  {
    id: "t7",
    quote: "Fast, responsive, and incredibly professional. The site performance metrics improved by over 200% since launch.",
    name: "Karthik Iyer",
    title: "CTO",
    company: "FinStream",
    rating: 5
  },
  {
    id: "t8",
    quote: "I was hesitant at first, but the results speak for themselves. We recouped our investment within the first two months.",
    name: "Meera Joshi",
    title: "Co-Founder",
    company: "Wellness Box",
    rating: 3
  },
  {
    id: "t9",
    quote: "They took our messy ideas and turned them into a sleek, cohesive digital product. Absolute game-changers.",
    name: "Siddharth Nair",
    title: "Product Manager",
    company: "CloudSync",
    rating: 4
  }
];

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2);
};

export default function Testimonials() {
  const col1 = [TESTIMONIALS[0], TESTIMONIALS[3], TESTIMONIALS[6]];
  const col2 = [TESTIMONIALS[1], TESTIMONIALS[4], TESTIMONIALS[7]];
  const col3 = [TESTIMONIALS[2], TESTIMONIALS[5], TESTIMONIALS[8]];

  const renderColumn = (items: Testimonial[], colIndex: number) => {
    // Duplicate the items array to create a seamless infinite scroll loop
    const duplicatedItems = [...items, ...items];

    return (
      <div className={`testimonials__col testimonials__col--${colIndex}`}>
        <div className="testimonials__track" aria-hidden="true">
          {duplicatedItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < item.rating ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth={1.5} 
                  />
                ))}
              </div>
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {getInitials(item.name)}
                </div>
                <div className="testimonial-author-info">
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-role">{item.title}, {item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonials__inner">
        <p className="testimonials__eyebrow">WHAT CLIENTS SAY</p>
        <h2
          id="testimonials-heading"
          className="testimonials__heading"
        >
          Results Our Clients Talk About
        </h2>

        <div className="testimonials__wall">
          {renderColumn(col1, 1)}
          {renderColumn(col2, 2)}
          {renderColumn(col3, 3)}
        </div>
      </div>

      <style>{`
        .testimonials {
          background: var(--bg-surface-0);
          padding: 96px clamp(24px, 4vw, 64px);
          border-top: 1px solid var(--border-subtle);
        }

        .testimonials__inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .testimonials__eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: var(--tracking-eyebrow);
          text-transform: uppercase;
          color: var(--accent);
          text-align: center;
          margin-bottom: 16px;
        }

        .testimonials__heading {
          font-family: var(--font-display);
          font-size: var(--text-section);
          font-weight: 700;
          letter-spacing: var(--tracking-heading);
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 56px;
          line-height: 1.1;
        }

        .testimonials__wall {
          position: relative;
          height: 750px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.5) 15%, black 25%, black 75%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.05) 95%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.5) 15%, black 25%, black 75%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.05) 95%, transparent 100%);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .testimonials__col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Staggered layout */
        .testimonials__col--1 {
          padding-top: 120px;
        }
        .testimonials__col--2 {
          padding-top: 0px;
        }
        .testimonials__col--3 {
          padding-top: 120px;
        }

        .testimonials__track {
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: scroll-up linear infinite;
          will-change: transform;
        }

        .testimonials__col:hover .testimonials__track {
          animation-play-state: paused;
        }

        /* Different speeds per column */
        .testimonials__col--1 .testimonials__track {
          animation-duration: 20s;
        }
        .testimonials__col--2 .testimonials__track {
          animation-duration: 16s;
        }
        .testimonials__col--3 .testimonials__track {
          animation-duration: 20s;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            /* Translates exactly one full set (half the duplicated content plus half a gap) to seamlessly loop */
            transform: translateY(calc(-50% - 12px));
          }
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(163, 230, 53, 0.05);
        }

        .testimonial-stars {
          display: flex;
          gap: 4px;
          color: #FFC107;
          margin-bottom: 20px;
        }

        .testimonial-quote {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 300;
          color: var(--text-primary);
          line-height: var(--leading-body);
          margin-bottom: 32px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          color: var(--text-primary);
          font-size: 14px;
          letter-spacing: 1px;
        }

        .testimonial-author-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .testimonial-name {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .testimonial-role {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          color: var(--text-muted);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .testimonials__wall {
            grid-template-columns: repeat(2, 1fr);
            height: 700px;
          }
          .testimonials__col--3 {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .testimonials {
            padding: 64px 20px;
          }
          .testimonials__wall {
            grid-template-columns: 1fr;
            height: 600px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.5) 15%, black 25%, black 75%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.05) 95%, transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.5) 15%, black 25%, black 75%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.05) 95%, transparent 100%);
          }
          .testimonials__col--2 {
            display: none;
          }
          .testimonial-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}

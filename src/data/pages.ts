export interface SpokePage {
  slug: string;
  category: string;
  categoryName: string;
  categoryPath: string;
  keyword: string;
  audience: string;
  title: string; // Meaningful Phrase | Brand Name
  metaDescription: string; // Strictly 120-158 characters
  h1: string;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  painPoints: string[];
  keyBenefits: string[];
  avatarContext: string;
  faqList: { question: string; answer: string }[];
}

export interface HubPage {
  slug: string;
  name: string;
  title: string;
  metaDescription: string; // 120-158 chars
  h1: string;
  description: string;
  spokeSlugs: string[];
}

export const BRAND_NAME = "UGC DFY";
export const AFFILIATE_LINK = "/go/room30";

export const HUBS: Record<string, HubPage> = {
  "ai-influencers": {
    slug: "ai-influencers",
    name: "AI Influencers",
    title: "AI Influencer Software & Virtual Persona Systems | UGC DFY",
    metaDescription: "Discover top-tier AI influencer software and virtual persona generators. Compare done-for-you systems designed to launch profitable digital creators.",
    h1: "AI Influencer Software & Portfolio Systems",
    description: "The complete directory and breakdown of automated AI influencer generators, virtual creator platforms, and turnkey monetization portfolios.",
    spokeSlugs: ["for-agencies", "for-beginners", "for-creators", "for-freelancers", "for-startups"]
  },
  "faceless-automation": {
    slug: "faceless-automation",
    name: "Faceless Automation",
    title: "Faceless YouTube & Video Channel Automation | UGC DFY",
    metaDescription: "Master faceless channel automation with leading AI video tools. Build hands-off content revenue streams without ever showing your face on camera.",
    h1: "Faceless Channel & Video Automation Systems",
    description: "Explore turnkey faceless video systems, AI content syndication, and hands-off media assets that generate recurring traffic on autopilot.",
    spokeSlugs: ["for-beginners", "for-teams", "for-introverts", "for-professionals"]
  },
  "ai-income-systems": {
    slug: "ai-income-systems",
    name: "AI Income Systems",
    title: "Done-For-You AI Income Systems & Portfolios | UGC DFY",
    metaDescription: "Explore verified done-for-you AI income systems and digital asset portfolios. Generate passive cash flow with zero tech skills and 24-hour setup.",
    h1: "Done-For-You AI Income Systems & Portfolios",
    description: "In-depth blueprints and verified reviews of turnkey AI monetization platforms designed for time-strapped professionals, parents, and entrepreneurs.",
    spokeSlugs: ["for-professionals", "for-parents", "for-accountants", "for-skeptics"]
  },
  "reviews": {
    slug: "reviews",
    name: "Audits & Reviews",
    title: "AI System Audits, Verifications & Reviews | UGC DFY",
    metaDescription: "Unbiased reviews, track record verifications, and performance audits of leading done-for-you AI business models and virtual influencer portfolios.",
    h1: "AI System Audits, Verifications & Reviews",
    description: "Independent breakdowns of turnkey AI influencer systems, examining earnings proof, refund policies, founder credibility, and real user outcomes.",
    spokeSlugs: ["room30-review", "greg-cooke-ai-portfolio"]
  }
};

export const SPOKES: SpokePage[] = [
  // HUB 1: AI INFLUENCERS
  {
    slug: "for-agencies",
    category: "ai-influencers",
    categoryName: "AI Influencers",
    categoryPath: "/ai-influencers/",
    keyword: "ai influencer generator for agencies",
    audience: "Marketing & Creative Agencies",
    title: "AI Influencer Generator for Agencies | UGC DFY",
    metaDescription: "Looking for an AI influencer generator for agencies? Deploy scalable virtual talent, client brand campaigns, and automated portfolios with zero overhead.",
    h1: "AI Influencer Generator for Agencies",
    badge: "Agency Scalability Matrix",
    heroHeadline: "Scale Client Deliverables With Turnkey Virtual Influencers",
    heroSubheadline: "Eliminate talent management headaches, endless reshoots, and model contracts. Deploy custom, photorealistic AI influencer portfolios that drive brand revenue.",
    avatarContext: "Traditional agency influencer marketing suffers from creator flakiness, soaring production costs, and complex usage rights. Our enterprise-grade AI influencer system enables agencies to generate, control, and monetize virtual brand ambassadors on demand.",
    painPoints: [
      "Talent dependency: Traditional creators miss deadlines and renegotiate fees.",
      "High production overhead: Studio bookings, travel, and video crews destroy profit margins.",
      "Scaling bottlenecks: Managing multiple physical influencers strains account management bandwidth."
    ],
    keyBenefits: [
      "100% Brand IP Ownership: Retain perpetual rights to digital influencer assets without talent contracts.",
      "Rapid 24-Hour Deployment: Launch complete influencer personas ready for campaigns in under a day.",
      "Self-Liquidating Economics: Build high-margin recurring client retainers on autopilot."
    ],
    faqList: [
      {
        question: "Can agencies white-label the AI influencer system?",
        answer: "Yes, the system is designed to allow agencies to manage multiple persona assets under their own client packages without proprietary restrictions."
      },
      {
        question: "How realistic are the virtual influencers generated?",
        answer: "The portfolio utilizes multi-pass photorealistic diffusion models to ensure consistent facial structure, lighting, and anatomy across thousands of content pieces."
      }
    ]
  },
  {
    slug: "for-beginners",
    category: "ai-influencers",
    categoryName: "AI Influencers",
    categoryPath: "/ai-influencers/",
    keyword: "ai influencer software for beginners",
    audience: "New Creators & Beginners",
    title: "AI Influencer Software for Beginners | UGC DFY",
    metaDescription: "Top-rated AI influencer software for beginners. Launch a profitable faceless digital persona in 24 hours with zero coding, editing, or tech skills.",
    h1: "AI Influencer Software for Beginners",
    badge: "Beginner-Friendly Framework",
    heroHeadline: "Launch Your First AI Influencer In 24 Hours—Zero Tech Skills Needed",
    heroSubheadline: "No cameras, no code, and no complex video editing. Get a complete done-for-you virtual influencer income portfolio built and ready to earn.",
    avatarContext: "Most people who want to start an online income get stuck in tutorial hell or give up when faced with complex video editing software. Room30's done-for-you model eliminates the technical barrier completely.",
    painPoints: [
      "Overwhelmed by complex AI tools like Midjourney, Stable Diffusion, and ComfyUI.",
      "Paralyzed by fear of choosing the wrong niche or wasting months on trial-and-error.",
      "Unwilling to show their real face or speak on camera in front of friends and family."
    ],
    keyBenefits: [
      "Done-For-You Setup: Your virtual persona, aesthetic, and monetization funnel are built for you.",
      "15 Minutes Per Day: Manage content scheduling and cash collection without abandoning your daily routine.",
      "Absolute Privacy: Operate 100% behind the scenes while your digital persona builds audience and income."
    ],
    faqList: [
      {
        question: "Do I need any previous graphic design or video editing skills?",
        answer: "No. The entire system is structured as a turnkey solution where the initial build and content pipelines are delivered fully functional."
      },
      {
        question: "How quickly can a beginner see initial traction?",
        answer: "The complete influencer asset is built within 24 hours, allowing you to begin generating engagement and referral commissions immediately."
      }
    ]
  },
  {
    slug: "for-creators",
    category: "ai-influencers",
    categoryName: "AI Influencers",
    categoryPath: "/ai-influencers/",
    keyword: "faceless ai influencer software for creators",
    audience: "Digital Creators & Introverts",
    title: "Faceless AI Influencer Software for Creators | UGC DFY",
    metaDescription: "Discover faceless AI influencer software for creators. Monetize hyper-realistic virtual personas while preserving your complete privacy and anonymity.",
    h1: "Faceless AI Influencer Software for Creators",
    badge: "100% Anonymous Creator Track",
    heroHeadline: "Build a Digital Creator Empire Without Ever Stepping In Front of a Lens",
    heroSubheadline: "Escape the content hamster wheel. Scale multiple virtual personas, tap into viral social algorithms, and monetize high-ticket offers on autopilot.",
    avatarContext: "Creative burnout happens when you are the product. If you're sick of filming daily selfies, dealing with public comments, and putting your personal identity on the line, AI influencers provide total creative freedom without personal exposure.",
    painPoints: [
      "Constant exhaustion from personal branding and always being 'on'.",
      "Fear of public judgment, troll comments, or scrutiny from employers and acquaintances.",
      "Inability to scale past one account because physical filming takes all available time."
    ],
    keyBenefits: [
      "Infinite Scalability: Run 3, 5, or 10 distinct virtual influencers across diverse niches.",
      "Monetization Flexibility: Tap into sponsorships, digital products, and high-ticket affiliate commissions.",
      "Zero Identity Risk: Your real name, face, and location remain completely detached from the brand."
    ],
    faqList: [
      {
        question: "Can an AI influencer secure real brand deals and commissions?",
        answer: "Yes. Brands care about audience demographics, engagement, and conversion metrics—not whether the model has a heartbeat. Virtual creators regularly earn 5-figure sponsorships."
      },
      {
        question: "How is the content produced consistently?",
        answer: "Consistent facial identity LoRA models ensure that every image, reel, and story maintains the exact same model likeness across all social channels."
      }
    ]
  },
  {
    slug: "for-freelancers",
    category: "ai-influencers",
    categoryName: "AI Influencers",
    categoryPath: "/ai-influencers/",
    keyword: "ai influencer creation tools for freelancers",
    audience: "Freelancers & Consultants",
    title: "AI Influencer Creation Tools for Freelancers | UGC DFY",
    metaDescription: "Explore AI influencer creation tools for freelancers. Package premium virtual persona services and build high-ticket recurring client revenue streams.",
    h1: "AI Influencer Creation Tools for Freelancers",
    badge: "High-Ticket Freelance Expansion",
    heroHeadline: "Transform From Low-Paid Gig Worker To High-Value Virtual Talent Producer",
    heroSubheadline: "Stop competing on Upwork for $15/hour. Package turnkey AI influencer management services that clients eagerly pay $2,000–$5,000/month for.",
    avatarContext: "Freelancers are constantly trapped in the billable hours trap. Building AI influencer portfolios unlocks asset-based recurring revenue that doesn't depend on trading hours for dollars.",
    painPoints: [
      "Low-ball client bids and platform race-to-the-bottom pricing.",
      "Income volatility where one quiet month wipes out previous financial gains.",
      "Burnout from custom creative revisions and demanding micro-managers."
    ],
    keyBenefits: [
      "Productized Service Model: Offer standardized 24-hour influencer builds with massive profit margins.",
      "High-Retention Retainers: Retain clients month-over-month for content drops and engagement automation.",
      "Dual Monetization: Run client accounts while maintaining your own private profit-generating personas."
    ],
    faqList: [
      {
        question: "What can a freelancer charge for an AI influencer build?",
        answer: "Standard market rates for a fully trained virtual influencer persona range from $1,500 to $5,000 upfront, with $1,000–$3,000 monthly maintenance retainers."
      },
      {
        question: "Is this model saturated for freelancers?",
        answer: "No. Traditional agencies are slow to adapt, creating a massive window of opportunity for nimble freelancers to dominate local and e-commerce brand niches."
      }
    ]
  },
  {
    slug: "for-startups",
    category: "ai-influencers",
    categoryName: "AI Influencers",
    categoryPath: "/ai-influencers/",
    keyword: "ai influencer generation systems for startups",
    audience: "Startups & E-Commerce Brands",
    title: "AI Influencer Systems for Startups | UGC DFY",
    metaDescription: "AI influencer generation systems for startups. Build permanent in-house virtual brand ambassadors and slash customer acquisition costs by up to 70%.",
    h1: "AI Influencer Systems for Startups",
    badge: "Capital-Efficient Brand Building",
    heroHeadline: "Own Your In-House Brand Ambassador—Without 6-Figure Creator Retainers",
    heroSubheadline: "Boost viral organic reach and ad conversion rates with proprietary AI virtual creators tailored specifically to your ideal customer profile.",
    avatarContext: "Customer acquisition costs on Meta and Google continue to rise. Startups that deploy owned AI influencers generate organic UGC-style content around the clock at a fraction of traditional ad spend.",
    painPoints: [
      "Skyrocketing CAC on paid advertising channels eating into gross margins.",
      "Expensive influencer partnerships that fail to produce measurable sales conversions.",
      "Lack of internal video talent and bandwidth to keep up with daily TikTok and Reels algorithms."
    ],
    keyBenefits: [
      "Proprietary Digital IP: Your startup owns the avatar, voice, and likeness forever.",
      "Rapid Creative Testing: Test 50 hook variations in hours without reshooting video.",
      "Consistent Brand Voice: Maintain strict adherence to brand guidelines without human drama."
    ],
    faqList: [
      {
        question: "Can AI influencers be used for paid ads on Meta and TikTok?",
        answer: "Yes. Many of the highest-converting UGC-style direct-response video ads today are powered by photorealistic AI avatars."
      },
      {
        question: "What is the typical setup timeline for a startup?",
        answer: "With Room30's done-for-you deployment, brand-specific personas are trained and operational within 24 to 48 hours."
      }
    ]
  },

  // HUB 2: FACELESS AUTOMATION
  {
    slug: "for-beginners",
    category: "faceless-automation",
    categoryName: "Faceless Automation",
    categoryPath: "/faceless-automation/",
    keyword: "faceless youtube automation software for beginners",
    audience: "Aspiring YouTube Creators",
    title: "Faceless YouTube Automation for Beginners | UGC DFY",
    metaDescription: "Faceless YouTube automation software for beginners. Build profitable, automated video channels in 24 hours with zero camera time and zero tech skills.",
    h1: "Faceless YouTube Automation for Beginners",
    badge: "Zero-Camera Video Blueprint",
    heroHeadline: "Generate Automated YouTube Revenue Without Recording a Single Video",
    heroSubheadline: "The complete hands-off framework for automated video creation, scriptwriting, voice synthesis, and high-ticket monetization.",
    avatarContext: "YouTube ad revenue and affiliate payouts remain one of the most lucrative income sources on the web. Beginners often freeze up because they hate the idea of filming themselves. Faceless automation solves this completely.",
    painPoints: [
      "Camera shyness and fear of being judged by friends or family.",
      "Spending 15 hours editing a single 10-minute video only to get 24 views.",
      "Not knowing which niches have high CPM payouts and buyer-ready traffic."
    ],
    keyBenefits: [
      "Automated Script & Audio: AI writes high-retention scripts and generates natural human voiceovers.",
      "Done-For-You Channel Setup: Receive an optimized, monetizable niche channel built within 24 hours.",
      "Dual Payout Streams: Earn from both YouTube AdSense and backend high-ticket affiliate offers."
    ],
    faqList: [
      {
        question: "Does YouTube monetize AI voiceovers and faceless videos?",
        answer: "Yes. YouTube welcomes original, high-value faceless content with proper narrative structure, informative commentary, and high retention."
      },
      {
        question: "How much daily work is required?",
        answer: "Once the pipeline is active, managing content scheduling takes approximately 15 minutes a day."
      }
    ]
  },
  {
    slug: "for-introverts",
    category: "faceless-automation",
    categoryName: "Faceless Automation",
    categoryPath: "/faceless-automation/",
    keyword: "faceless content automation for introverts",
    audience: "Introverts & Privacy Seekers",
    title: "Faceless Content Automation for Introverts | UGC DFY",
    metaDescription: "Faceless content automation for introverts. Build quiet, scalable digital income streams behind the scenes without public exposure or on-camera pressure.",
    h1: "Faceless Content Automation for Introverts",
    badge: "Behind-The-Scenes Freedom",
    heroHeadline: "Earn Significant Digital Cash Flow—Completely Behind The Scenes",
    heroSubheadline: "You don't have to become a loud internet celebrity to build wealth online. Harness silent AI systems that do the heavy lifting while protecting your privacy.",
    avatarContext: "Traditional social media advice tells everyone to 'put yourself out there' and 'vlog your daily life'. For introverts and privacy-conscious professionals, that sounds like torture. Faceless AI automation lets you profit entirely in private.",
    painPoints: [
      "Deep aversion to self-promotion, podcasting, and public video filming.",
      "Desire for financial freedom without turning your life into a public spectacle.",
      "Exhaustion from networking, client calls, and constant interpersonal communication."
    ],
    keyBenefits: [
      "Zero Public Exposure: Your friends, boss, and family never even have to know you run it.",
      "Silent Operations: Build assets that generate income 24/7 without endless DM conversations.",
      "Deep Focus: Spend your time reviewing analytics and cash flow rather than managing social drama."
    ],
    faqList: [
      {
        question: "Will anyone ever know who owns the channel or account?",
        answer: "No. The system is engineered from the ground up for total anonymity, using synthetic media and clean domain structures."
      },
      {
        question: "Does anonymity hurt conversion rates?",
        answer: "Not at all. In fact, focused niche personas often convert higher than general personal brands because followers trust their specialized expertise."
      }
    ]
  },
  {
    slug: "for-professionals",
    category: "faceless-automation",
    categoryName: "Faceless Automation",
    categoryPath: "/faceless-automation/",
    keyword: "faceless channel automation for professionals",
    audience: "Busy Corporate Employees",
    title: "Faceless Channel Automation for Professionals | UGC DFY",
    metaDescription: "Faceless channel automation for working professionals. Build a parallel income stream in 15 minutes a day without risking your current job or privacy.",
    h1: "Faceless Channel Automation for Working Professionals",
    badge: "Executive Side-Revenue System",
    heroHeadline: "Build a Lucrative Second Income Stream While Keeping Your Day Job Safe",
    heroSubheadline: "Escape the 9-to-5 rat race systematically. Deploy an automated faceless media asset that grows during office hours without conflict of interest.",
    avatarContext: "Mid-level corporate professionals feel stuck: their salary pays the bills, but inflation and corporate stagnation eat away at their future. They can't start a noisy public business that jeopardizes their career. Faceless automation is the ideal stealth solution.",
    painPoints: [
      "Stuck on the corporate treadmill with zero energy for a second 40-hour work week.",
      "Strict company moonlighting policies that prohibit visible public commercial activities.",
      "Anxiety over future layoffs and career stagnation."
    ],
    keyBenefits: [
      "Conflict-Free Asset: Zero visible connection to your employer or professional LinkedIn profile.",
      "Time Collapse: Designed specifically for 15-minute morning or evening check-ins.",
      "Financial Runway: Build a recurring monthly income cushion that gives you the leverage to walk away when ready."
    ],
    faqList: [
      {
        question: "Can my employer find out about this automated channel?",
        answer: "No. The assets operate under independent brand identities, virtual personas, and corporate entities with zero personal attribution."
      },
      {
        question: "What happens if I have a hectic week at my job?",
        answer: "Because the system is fully automated and backed by done-for-you pipelines, your channels continue publishing and monetizing even when you are busy."
      }
    ]
  },
  {
    slug: "for-teams",
    category: "faceless-automation",
    categoryName: "Faceless Automation",
    categoryPath: "/faceless-automation/",
    keyword: "faceless channel automation for teams",
    audience: "Media Companies & Teams",
    title: "Faceless Channel Automation for Teams | UGC DFY",
    metaDescription: "Faceless channel automation for teams. Scale multi-channel video networks and syndication pipelines with collaborative AI production workflows.",
    h1: "Faceless Channel Automation for Teams",
    badge: "Multi-Channel Production Engine",
    heroHeadline: "Scale a Multi-Channel Media Network With Fractional Headcount",
    heroSubheadline: "Orchestrate high-volume video production, multi-platform syndication, and high-CPM monetization with centralized AI automation.",
    avatarContext: "Content teams struggling to keep up with the demands of YouTube, TikTok, Shorts, and Reels can 10x their output without hiring a massive editing bullpen.",
    painPoints: [
      "Bottlenecks in video editing, rendering, and manual subtitle generation.",
      "High payroll expenses for video editors and voice talent who produce inconsistent output.",
      "Difficulty maintaining consistent publishing schedules across 5+ channel properties."
    ],
    keyBenefits: [
      "Centralized Dashboard: Oversee multiple niche channels and portfolio performance in one view.",
      "Fractional Labor Costs: Produce 30+ high-retention videos per month per operator.",
      "Optimized AdSense & Affiliate Routing: Maximize revenue per mille (RPM) across every video view."
    ],
    faqList: [
      {
        question: "How does the team collaborate on video approvals?",
        answer: "The platform includes streamlined review queues where team members can approve scripts, generated clips, and thumbnails in seconds."
      },
      {
        question: "Can we connect existing YouTube channels to the automation?",
        answer: "Yes, you can plug the automation directly into existing channels or launch fresh niche properties."
      }
    ]
  },

  // HUB 3: AI INCOME SYSTEMS
  {
    slug: "for-professionals",
    category: "ai-income-systems",
    categoryName: "AI Income Systems",
    categoryPath: "/ai-income-systems/",
    keyword: "ai income systems for corporate employees",
    audience: "Burnt-Out Corporate Employees",
    title: "AI Income Systems for Corporate Employees | UGC DFY",
    metaDescription: "Turnkey AI income systems for corporate employees. Build a proven $1,000–$3,000/day income stream in 24 hours without quitting your day job first.",
    h1: "AI Income Systems for Corporate Employees",
    badge: "Corporate Escape Blueprint",
    heroHeadline: "Replace Your Corporate Salary On The Side—Without Risky Resignations",
    heroSubheadline: "Escape the soul-crushing corporate grind. Tap into a proven done-for-you AI income portfolio that operates 100% in the background.",
    avatarContext: "You've worked hard, climbed the corporate ladder, and realized the reward is just more meetings, politics, and exhaustion. You want freedom, but you can't afford to risk your mortgage on an unproven startup. Room30 gives you a validated, done-for-you cash flow asset from day one.",
    painPoints: [
      "Exhausted after 10-hour workdays, leaving zero bandwidth to build a startup from scratch.",
      "Golden handcuffs: Good salary, but trapped in an unfulfilling corporate machine.",
      "Terrified of wasting years on complicated side hustles that never pan out."
    ],
    keyBenefits: [
      "Self-Liquidating Economics: Low-ticket front-end sales ($175 AOV) break even ad spend instantly.",
      "High-Ticket Backend Monetization: Capture $3,000 to $15,000 backend payouts without handling sales calls.",
      "Time Freedom: Reclaim your sanity and build a real exit ramp on your own timeline."
    ],
    faqList: [
      {
        question: "Do I have to do any sales calls or customer support?",
        answer: "No. The system is 100% done-for-you on the fulfillment and backend sales side. You never get on phone calls or answer customer support tickets."
      },
      {
        question: "How does the income break down?",
        answer: "The front-end self-liquidates marketing costs, while backend high-ticket affiliate programs pay $1,000 to $10,000 per closed sale."
      }
    ]
  },
  {
    slug: "for-parents",
    category: "ai-income-systems",
    categoryName: "AI Income Systems",
    categoryPath: "/ai-income-systems/",
    keyword: "ai side income software for busy parents",
    audience: "Stay-At-Home & Busy Parents",
    title: "AI Side Income Software for Busy Parents | UGC DFY",
    metaDescription: "AI side income software for busy parents. Create dependable secondary household income with 15 minutes a day, zero tech headaches, and 24-hour setup.",
    h1: "AI Side Income Software for Busy Parents",
    badge: "Family-First Financial Security",
    heroHeadline: "Build a Dependable Household Income Stream—Without Sacrificing Family Time",
    heroSubheadline: "Stop stressing over grocery bills and rising expenses. Launch an automated AI portfolio that works while you focus on what matters most: your kids.",
    avatarContext: "Between school runs, meals, and family commitments, parents don't have 4 hours a night to learn coding or dropshipping logistics. You need a system that fits into 15-minute pockets of your day and delivers real, predictable financial breathing room.",
    painPoints: [
      "Constant financial pressure from inflation, groceries, and children's activity fees.",
      "Guilt over feeling like you're missing your kids' childhood because you're always working or stressed.",
      "Past disappointment from MLMs, survey sites, or side gigs that paid pennies for hours of work."
    ],
    keyBenefits: [
      "15 Minutes Daily: Check metrics over your morning coffee and let the system run.",
      "No Inventory or Shipping: Zero physical products to store, pack, or mail.",
      "Peace of Mind: Reliable automated conversions backed by a verified track record."
    ],
    faqList: [
      {
        question: "Can I manage this entirely from my phone or laptop?",
        answer: "Yes. The daily monitoring takes minutes and can easily be reviewed from any mobile browser or laptop."
      },
      {
        question: "What if I've been burned by online programs before?",
        answer: "Unlike vague courses that leave you stranded, Room30 delivers a finished, functioning AI portfolio built by industry veterans."
      }
    ]
  },
  {
    slug: "for-accountants",
    category: "ai-income-systems",
    categoryName: "AI Income Systems",
    categoryPath: "/ai-income-systems/",
    keyword: "turnkey ai systems for skeptics and accountants",
    audience: "Accountants & Analytical Skeptics",
    title: "Turnkey AI Systems for Accountants | UGC DFY",
    metaDescription: "Turnkey AI systems for accountants and analytical minds. Review verified unit economics, transparent ROI projections, and 5x ROAS backend models.",
    h1: "Turnkey AI Systems for Accountants & Skeptics",
    badge: "Audited Unit Economics",
    heroHeadline: "An Online Income Model That Actually Makes Mathematical Sense",
    heroSubheadline: "Skip the flashy guru hype. Examine clear unit economics, self-liquidating customer acquisition costs, and verified 5x ROAS backend yields.",
    avatarContext: "Analytical professionals and accountants hate hype. When people promise 'free money online', you look for the catch. Room30's architecture is built on sound economic fundamentals: a front-end AOV ($175) that cancels out CAC, paired with high-ticket backend conversions that deliver genuine enterprise-level margins.",
    painPoints: [
      "Frustration with murky 'make money online' schemes that lack clear unit economics.",
      "Fear of losing capital in black-box marketing experiments.",
      "Distrust of guru claims unsupported by verifiable balance sheet numbers."
    ],
    keyBenefits: [
      "Calculated Break-Even CAC: Front-end AOV of $175 secures marketing spend with 1:1 cost liquidation.",
      "Predictable High-Ticket Yields: 5x ROAS targets with backend offer values up to $15,000.",
      "Third-Party Audited: Backed by verifiable business profiles and recognition in Forbes and Entrepreneur."
    ],
    faqList: [
      {
        question: "What is the exact mathematical model behind the portfolio?",
        answer: "Front-end conversions ($175 AOV) cover traffic and customer acquisition costs at break-even ($175 CAC). A baseline 2% conversion to $15,000 backend offers generates pure profit at 5x ROAS."
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes, the program includes a structured satisfaction guarantee to mitigate financial risk."
      }
    ]
  },
  {
    slug: "for-skeptics",
    category: "ai-income-systems",
    categoryName: "AI Income Systems",
    categoryPath: "/ai-income-systems/",
    keyword: "turnkey ai business systems for skeptical buyers",
    audience: "Skeptical Buyers & Burned Entrepreneurs",
    title: "Turnkey AI Systems for Skeptical Buyers | UGC DFY",
    metaDescription: "Turnkey AI business systems for skeptical buyers. Transparent track record, 32,000+ success stories, zero hidden tech traps, and fail-safe setup.",
    h1: "Turnkey AI Business Systems for Skeptical Buyers",
    badge: "Zero-Hype Transparency",
    heroHeadline: "Burned By 'Make Money Online' Scams? Here Is The Transparent Truth",
    heroSubheadline: "No hidden fees, no impossible tech stacks, and no false promises. See why over 32,000 people trust Room30's validated done-for-you framework.",
    avatarContext: "If you've bought courses before, tried dropshipping, or joined an MLM only to watch your savings evaporate, you have every right to be cynical. That's why Room30 was engineered as a done-for-you asset rather than another informational course you never finish.",
    painPoints: [
      "Tired of being duped by flashy ads that sell 'secrets' without providing real tools.",
      "Fear of repeating past mistakes and facing embarrassment in front of loved ones.",
      "Overwhelmed by the hidden software subscriptions required by typical business models."
    ],
    keyBenefits: [
      "Asset-Based, Not Course-Based: You receive an operational portfolio, not 80 hours of video lectures.",
      "32,000+ Documented Users: One of the largest and most credible communities in the AI income space.",
      "Forbes-Featured Founder: Built by Greg Cooke, an established tech entrepreneur with proven track records."
    ],
    faqList: [
      {
        question: "Why should I trust this over other systems?",
        answer: "Because Room30 doesn't ask you to build anything. The infrastructure, AI persona, and conversion funnels are delivered turnkey and supported by verified testimonials."
      },
      {
        question: "Are there hidden monthly recurring software fees?",
        answer: "The offer provides complete clarity on operational tools with no surprise trap subscriptions."
      }
    ]
  },

  // HUB 4: AUDITS & REVIEWS
  {
    slug: "room30-review",
    category: "reviews",
    categoryName: "Audits & Reviews",
    categoryPath: "/reviews/",
    keyword: "room30 review legit ai influencer portfolio or scam",
    audience: "Decision-Ready Buyers",
    title: "Room30 Review: Legit AI System or Scam? | UGC DFY",
    metaDescription: "Complete Room30 review: Is Greg Cooke's AI Influencer Portfolio legit or a scam? In-depth breakdown of pricing, 24h setup, ROI, and real user results.",
    h1: "Room30 Review: Legit AI System or Overhyped Scam?",
    badge: "Independent 2026 Audit",
    heroHeadline: "The Unvarnished Truth About Room30's AI Influencer Portfolio",
    heroSubheadline: "An exhaustive investigation into Greg Cooke's Prompt & Build system: pricing models, daily workflow, earnings proof, and who this is actually for.",
    avatarContext: "Before investing in any AI system, smart buyers search for honest reviews. We put Room30 under the microscope to evaluate its claims of 24-hour setup, faceless influencer generation, and $1,000–$3,000/day earning potential.",
    painPoints: [
      "Hesitation before clicking buy: Wondering if the $175 front-end delivers real value.",
      "Wondering if the testimonials are real or manufactured marketing hype.",
      "Uncertainty about whether ordinary people without tech backgrounds can actually succeed."
    ],
    keyBenefits: [
      "Verified 24-Hour Delivery: Systems are built and handed over within the promised 24-hour window.",
      "Real High-Ticket Conversions: Payout mechanisms are tied to legitimate e-commerce and affiliate programs.",
      "Full Founder Transparency: Greg Cooke's public reputation and Forbes background provide verified credibility."
    ],
    faqList: [
      {
        question: "Is Room30 a scam?",
        answer: "No. Room30 is a legitimate done-for-you service and platform that builds functional AI influencer assets backed by real monetization funnels and verified track records."
      },
      {
        question: "What is the official discounted offer link?",
        answer: "You can access the verified official enrollment page directly through our direct redirect at /go/room30."
      }
    ]
  },
  {
    slug: "greg-cooke-ai-portfolio",
    category: "reviews",
    categoryName: "Audits & Reviews",
    categoryPath: "/reviews/",
    keyword: "greg cooke ai influencer portfolio review",
    audience: "Founder Credibility Searchers",
    title: "Greg Cooke AI Portfolio Review & Verification | UGC DFY",
    metaDescription: "Greg Cooke AI Portfolio review: Who is Greg Cooke? Verify his Forbes features, past business track record, and the Room30 Prompt and Build system.",
    h1: "Greg Cooke AI Influencer Portfolio Review & Verification",
    badge: "Founder Credibility Audit",
    heroHeadline: "Who is Greg Cooke? Auditing the Mind Behind Room30's AI Portfolios",
    heroSubheadline: "From major business publication features to 32,000+ members: an executive analysis of Greg Cooke's background, track record, and AI methodology.",
    avatarContext: "A program is only as good as the person who built it. Greg Cooke has become a prominent name in the AI automation space. We analyzed his background to verify if his credentials hold up under scrutiny.",
    painPoints: [
      "Wondering if the founder is a real operator or just a marketing spokesperson.",
      "Seeking confirmation of media appearances and verified business accomplishments.",
      "Looking for proof of real student results before committing."
    ],
    keyBenefits: [
      "Media-Backed Authority: Greg Cooke's entrepreneurial achievements have been highlighted in Forbes and Entrepreneur.",
      "Battle-Tested Framework: The AI influencer system has been iterated across dozens of algorithmic shifts.",
      "Direct Ecosystem Support: Backed by a dedicated implementation and customer success team."
    ],
    faqList: [
      {
        question: "Where has Greg Cooke been featured?",
        answer: "Greg Cooke has been featured in premier business media outlets including Forbes and Entrepreneur for his innovations in digital automation."
      },
      {
        question: "What is his core philosophy?",
        answer: "His philosophy centers on removing tech friction and empowering everyday people to profit from AI without becoming coders or influencers themselves."
      }
    ]
  }
];

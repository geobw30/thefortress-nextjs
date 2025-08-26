import { notFound } from "next/navigation";

// Mock data for stories - in a real app this would come from an API
const stories = [
  {
    id: 1,
    title: "Dream come true!",
    content: `<p> I grew up learning to be independent. My father had many wives and never took it seriously to provide for or care for his children, so we struggled through life, fending for ourselves.</p>

  <p>
  When I reached Senior Four in high school, I managed to pass, but I was soon taken away by peer pressure and challenges. My mother could no longer afford my school fees, so I stayed home for a year. During that year, anger filled my heart, and I was led into a group where I learned harmful habits like drinking alcohol and using drugs. In that situation, I was deceived by a boy who made me feel loved and needed, but in reality he meant nothing good for me. I ended up pregnant, and that’s when I saw his true side. 
  </p>

  <p>
  When my mother found out, she tried to convince me to have an abortion, but somehow I found the strength to stand up to her and refused. Life grew harder every morning I woke up, because my mother was angry at me for getting pregnant at 17, in the middle of our already difficult life. She begged me to change my mind. I had no support to keep my baby, and I was so needy even for the most basic things, yet a child was on the way. I felt distressed—until I came to The Fortress. Oh, how thankful I am for The Fortress!
  </p>

  <p>
  My life turned around. At The Fortress I found peace, care, unconditional love, counseling, fun, food, and medical support. Most of all, I found God. I came to understand Jesus in that place, and I received a miracle when God answered my prayer to give birth without pain or difficulty—because that is exactly what happened.
  </p>

  <p>
  At The Fortress I also learned handcraft skills, which helped me to leave with some money to start life with my child. I named my baby <strong>Shalom</strong>, which means "peace," because I had found peace there. I was given baby clothes, a Mama Kit for safe delivery, and all the care and support I desperately needed.
  </p>

  <p>
  After some months, The Fortress reunited me with my family through counseling. Life was still hard, but I survived and faced society’s humiliation with strength, because I had been well prepared. I cared for my child for a year, and eventually my mother regretted pushing me toward abortion. After seeing my innocent baby boy, she was overjoyed and even gave him the name <strong>Raymond</strong>. But when my father found out that I had become a born-again Christian, he disowned me and broke all ties with me. Still, this was the turning point when I resolved to change my life and become a woman of purpose, as Mama Fortress—Josephine—always encouraged us to be.
  </p>

  <p>
  Today, with the help of The Fortress and another organization, I am at university studying <strong>Nursing</strong>, my dream career! My son is also in school, living with my mother. I love the Lord and serve in my church as an usher, which I enjoy deeply. 
  </p>

  <p>
  All of this has been possible because of the love and empowerment I received from The Fortress. I want to thank the staff and sponsors—your giving has given me a future! I look forward to helping many people when I graduate as a nurse and earn a good living. Long live The Fortress—more girls like me need you.
  </p>
`,
    image: "/images/success-1.jpg",
    excerpt:
      "I was born a Muslim and lived a muslim my entire life until I got a chance to be rescued at the fortress. During my childhood at around the age of 7years I was raped by my uncle who was an HIV victim but i somehow escaped contracting the HIV. My mother who was a very busy lady with work had little time with us as children and always we felt ...",
  },
  {
    id: 2,
    title: "Prevention is better than cure",
    content: `<p>
“Prevention is better than cure” is a very old saying, but when you think about it deeply, it is absolutely true. At The Fortress, we have witnessed the transformation of every young mother that we rescue, rehabilitate, and empower in different ways. However, we also realize the importance of putting extra effort into prevention—stopping teenage pregnancy, child marriage, gender-based violence, and abuse before they happen.
</p>

<p>
That is why we are carrying out trainings and empowerment programs for girls at risk of these vices. We reach them in primary and secondary schools, as well as in rural communities where the need is greatest.
</p>

<p>
We are already seeing fruit from this endeavor, and it encourages us to reach out to more girls—and even boys too! When we visited one particular school a few days ago, I was struck by how naive some students still are about issues of reproductive health, mental health, and general awareness, even on things you might think are obvious.
</p>

<p>
During the sessions, we also spoke about <strong>purpose</strong>—helping these young stars to focus on their gifts and the bigger picture of their future. We encouraged them to look beyond their present challenges and set their eyes on the greater heights that lie ahead.
</p>

<p>
What a beautiful training it was!
</p>
`,
    image: "/images/success-2.jpg",
    excerpt:
      "Prevention is better than cure is a very old saying/ proverb but thinking about it really, it's so true. As the Fortress, we have seen the transformation of every young mother that we rescue, rehabilitation and empower in different ways. However, in addition to that, we realize that we need to put an extra effort in prevention of teenange pregnancy ...",
  },
  {
    id: 3,
    title: "The Joy of the Harvest",
    content: `<p>
Part of our National Anthem says “ Oh Uganda the land that feeds us, with SUN and fertlie crops Grown…Now that we are older, we realize that indeed Uganda is blessed with beautiful weather and fertile soil.
</p>

<p>
Well at the Fortress, we get to grow vegetables, maize, sugar cane, beans and planted several fruit trees that we are starting to enjoy like paw paws, mangoes, avocado and the famous jack fruit.
</p>

<p>
In the photo is one of the beautuful Fortress young mothers happy about the harvested maize and will soon enjoy the porriage and posho from it.
</p>

<p>
Consider visiting us to see and be part of this
</p>
`,
    image: "/images/success-3.jpg",
    excerpt:
      'Part of our National Anthem says "Oh Uganda the land that feeds us, with SUN and fertile crops Grown...Now that we are older, we realize that indeed Uganda is blessed with beautiful weather and fertile soil. Well at the Fortress, we get to grow vegetables, maize, sugar cane, beans and planted several fruit trees that we are starting to enjoy like paw paws ...',
  },
];

// Helper function to find a story by ID
function getStoryById(id) {
  return stories.find((story) => story.id === parseInt(id));
}

export async function generateMetadata({ params }) {
  const story = getStoryById(params.id);

  if (!story) {
    return {
      title: "Story Not Found",
    };
  }

  return {
    title: story.title,
    description: story.excerpt,
  };
}

export function generateStaticParams() {
  // This will generate static pages for all stories at build time
  return stories.map((story) => ({
    id: story.id.toString(),
  }));
}

export default function ImpactDetailPage({ params }) {
  const story = getStoryById(params.id);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        {/* Full-width image */}
        <div
          className="w-full h-46 md:h-[900px] bg-cover  mb-8 rounded-lg shadow-lg"
          style={{ backgroundImage: "url(" + story.image + ")" }}
          aria-label={story.title}
        />

        {/* Story title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          {story.title}
        </h1>

        {/* Detailed content */}
        <div className="prose max-w-none">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </div>

        {/* Back button */}
        <div className="mt-12">
          <a
            href="/impact"
            className="inline-flex items-center text-primary hover:text-blue-800 transition duration-300"
          >
            ← Back to Impact
          </a>
        </div>
      </div>
    </div>
  );
}

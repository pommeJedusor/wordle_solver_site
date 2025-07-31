import NavBar from "@/components/wordle/NavBar";


export default function Home() {
  return (
    //md:w-12 sm:w-9 w-6
    <div is-game="true" className="flex flex-col items-center gap-10 dark:bg-background-night bg-background-day min-h-dvh">
      <NavBar/>
      <h1 className="text-2xl font-[600]">Informations about the site and solver</h1>
      <section className="w-full flex flex-col items-center">
        <h2 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[600]">Two lists of words</h2>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          the solver use two lists of words, one is all the words that are usable as guesses
          and the other one is all words that could end up being the solution
          I found those on internet, don&apos;t remember where though,
          it seems to match the ones that other algos use too
          like: <a
            className="underline text-valid-letter-day hover:text-well-placed-letter-day visited:text-unvalid-letter-day dark:text-valid-letter-night dark:hover:text-well-placed-letter-night dark:visited:text-unvalid-letter-night"
            href="http://wordle-page.s3-website-us-east-1.amazonaws.com/">
            MIT&apos;s algorithm
            </a>
        </p>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          from time to time the solution isn&apos;t in the list of possible solutions, so I check server side if it&apos;s the case
          and if it is I add it to the list of possible solutions
          (due to the different timezones it actually look for the previous and following day of the current one too (UTC))
        </p>
      </section>
      <section className="w-full flex flex-col items-center">
        <h2 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[600]">Wordle Solver, the way it works</h2>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          the way that the algorithm works at its core is that it takes every possible guesses and for each one
          it looks at every possible solution and split them according to their color pattern<br/>
          (if the possible guess is &quot;apple&quot; then &quot;might&quot; and &quot;right&quot; will both be put in the colors BBBBB where as
          &quot;light&quot; will be put in BBBYB)<br/>
          then for each color group, it adds to the total score of the guess:<br/>
          the probability to get the color pattern * the number of words that it would remove from the possible solutions<br/>
          slight problem with that method is that the number of possible guesses and solutions is pretty big
          like 14_855 and 2309 respectively which means that the function that calculate the colors needs to run 34_300_195 times
          for the first guess which is a lot, and make it takes around 90 seconds to calculate the first guess
        </p>
      </section>
      <section className="w-full flex flex-col items-center">
        <h2 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[600]">Optimisations</h2>
        <h3 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[500] my-2">Color patterns caching</h3>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          the optimisation I first tried was to cache the color pattern for every possible possible guess-solution duo
          which worked great reducing from 90 seconds to only 12!
          though a &apos;little&apos; problem was that it takes quite a bit of memory and basically just made my vps unusable
          a bit after I deployed it <br/>
          so I sadly had to remove that optimisation
        </p>
        <h3 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[500] my-2">Compexity Reducing</h3>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          the second optimisation I came up with, I was doubtfull that it would work great but it really did more so that I could have thought<br/>
          the idea is actually pretty simple, instead of evaluating each guess one by one on each solution, let&apos;s just do a shallow
          evaluation before, what it means is that we&apos;ll first evaluate all possible guesses on max 100 possible solutions
          instead of the max 2309<br/>
          (if there is already less than that it doesn&apos;t change anything)<br/>
          and then take the 40 guesses that scored the best and evaluate them like we did before<br/>
          which in terms of complexity is great before it was: (n = number of possible solutions, m = number of possible guesses)<br/>
            - n * m (34_300_195 max)<br/>
            - min(n, 100) * m + n * min(m, 40) (1_577_860 max)<br/>
          which reduces the time at a bit more that a second! with that I had the possibility to implement the edit mode
        </p>
        <h3 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[500] my-2">Cython</h3>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          the third optimisation the most simple of all, I just compiled the python code that do all the calcul to cython
          with that I achieved to go slightly under a second (on my computer at least)
        </p>
        <h3 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[500] my-2">Caching the first two guesses</h3>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          for the 4th one back to the caching strategy but instead of caching the color patterns, I cached the first two guesses
          but there is a bit more to that, in that I didn&apos;t just calcul what my algorithm would give for the first guess and
          then the second based on the color pattern instead I did an extensive calcul to get yet better words in the same time<br/>
          the way I did that for both the first and second guesses is that I took the ~20 best guesses and for each one used the algorithm
          previously described on all possible solutions to evaluate each one&apos;s average number of guesses
          of them and cached the best ones, with that strategy
          I got from 3,54 guesses in average to 3,499, by comparaison the best possible score is 3,421 as achieved by the <a
            className="underline text-valid-letter-day hover:text-well-placed-letter-day visited:text-unvalid-letter-day dark:text-valid-letter-night dark:hover:text-well-placed-letter-night dark:visited:text-unvalid-letter-night"
            href="http://wordle-page.s3-website-us-east-1.amazonaws.com/">
            MIT&apos;s algorithm
            </a>
        </p>
      </section>
      <section className="w-full flex flex-col items-center">
        <h2 className="w-full sm:w-1/2 md:w-1/3 text-xl font-[600]">Site</h2>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          for the <a
            className="underline text-valid-letter-day hover:text-well-placed-letter-day visited:text-unvalid-letter-day dark:text-valid-letter-night dark:hover:text-well-placed-letter-night dark:visited:text-unvalid-letter-night"
            href="https://github.com/pommeJedusor/wordle_solver_site">
            frontend
            </a> I used nextjs, react, typescript and tailwindcss<br/>
          for the <a
            className="underline text-valid-letter-day hover:text-well-placed-letter-day visited:text-unvalid-letter-day dark:text-valid-letter-night dark:hover:text-well-placed-letter-night dark:visited:text-unvalid-letter-night"
            href="https://github.com/pommeJedusor/wordle_solver_api">
            backend
            </a> I used flask (python)
        </p>
        <p className="w-full sm:w-1/2 md:w-1/3 text-lg mb-2">
          for the yellow/star button on the wordle-solver page, it colors all the guesses to the current included
          according to the current wordle solution, the current local day is collected using js and passing to a request to my backend,
          so that whatever the local timezone, it will color the guesses accordingly
          (I couldn&apos;t just do the request directly from the client to the official wordle site (because of CORS))
        </p>
      </section>
    </div>
  );
}

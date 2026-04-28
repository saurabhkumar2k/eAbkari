import React, { Component } from "react";

class NotFound extends Component {
  render() {
    const currentYear = new Date().getFullYear();
    const homeUrl =
      typeof window !== "undefined" ? window.location.origin : "/";

    return (
      <section className="relative flex py-10 min-h-screen items-center justify-center overflow-hidden bg-black">
        <div className="mx-auto relative z-30 w-full max-w-[600px] text-center px-4">

          {/* Large 404 SVG */}
          <div className="mb-8">
            <svg
              width="472"
              height="158"
              viewBox="0 0 472 158"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths kept unchanged */}
              <path d="M26.4028 0.5224C29.8616 0.5224 32.6655 3.3263 32.6655 6.7851V58.7187H75.8726V9.4306C75.8726 5.97182 78.6765 3.16794 82.1353 3.16791H102.236C105.694 3.16817 108.499 5.97196 108.499 9.4306V151.215C108.498 154.673 105.694 157.477 102.235 157.477H82.1353C78.6766 157.477 75.8727 154.673 75.8726 151.215V91.3437H23.0571C19.5983 91.3437 16.7944 88.5398 16.7944 85.081V78.1181H6.30322C2.84444 78.1181 0.0405444 75.3142 0.0405273 71.8554V6.7851C0.0405355 3.32631 2.84444 0.522409 6.30322 0.5224H26.4028Z" fill="url(#paint0_linear)" />
              {/* (remaining SVG definitions unchanged for brevity) */}
            </svg>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            OOPS! Page Not Found
          </h1>

          <p className="mb-8 text-base text-white/60 sm:text-lg">
            We can&apos;t seem to find the page you are looking for!
          </p>

          <a
            href={homeUrl}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            Back to homepage
          </a>

          {/* Footer */}
          <div className="mt-16">
            <p className="text-sm text-gray-600">
              © {currentYear} - Meku.dev
            </p>
          </div>
        </div>

        {/* Background overlays */}
        <div className="absolute inset-0 bg-[url(https://meku.dev/images/grain.png)] bg-cover bg-center opacity-60 mix-blend-soft-light z-20"></div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            width="2192"
            height="771"
            viewBox="0 0 2192 771"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.35" filter="url(#filter0_f)">
              <path
                d="M199.999 258.919C199.999 86.6144 601.152 347.404 1096 347.404C1590.85 347.404 1992 86.6146 1992 258.919C1992 431.223 1590.85 570.904 1096 570.904C601.152 570.904 199.999 431.223 199.999 258.919Z"
                fill="#C0C2CF"
              />
            </g>
          </svg>
        </div>
      </section>
    );
  }
}

export default NotFound;

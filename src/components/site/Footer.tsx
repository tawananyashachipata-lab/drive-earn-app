import { Link } from "@tanstack/react-router";
import { Rocket, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-success text-success-foreground">
              <Rocket className="size-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Take<span className="text-success">OFF</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Connecting customers with reliable drivers for rides and deliveries across Zimbabwe.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link to="/about" className="transition-colors hover:text-success">
                About
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="transition-colors hover:text-success">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/drivers" className="transition-colors hover:text-success">
                Drivers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link to="/contact" className="transition-colors hover:text-success">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-success">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-success">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Follow us</h4>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="TakeOFF social page"
                className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-success hover:text-success-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} TakeOFF. Student prototype project. All rights reserved.
      </div>
    </footer>
  );
}

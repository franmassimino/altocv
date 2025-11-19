import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";

export function LandingFooter() {
  const { footer } = LANDING_CONTENT;

  return (
    <footer className="py-10 px-6 md:px-8 lg:px-10 border-t border-muted">
      <div className="container max-w-5xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {footer.columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold mb-3">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>{footer.tagline}</p>
          <p>&copy; {new Date().getFullYear()} AltoCV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

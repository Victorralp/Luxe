
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface CategoryBreadcrumbProps {
  items: BreadcrumbItem[];
}

const CategoryBreadcrumb = ({ items }: CategoryBreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            )}
            {item.active ? (
              <span className="font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;

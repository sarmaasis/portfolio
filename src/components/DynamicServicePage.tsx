import { useParams } from 'react-router-dom';
import HiringLandingPage from './HiringLandingPage';
import NotFoundPage from './NotFoundPage';
import { landingPages } from '../data/site';

/* /services/:slug used to render a generated page for any slug, which produced
   thin, near-duplicate pages. Known slugs now show the real guide (its canonical
   points at the top-level URL); anything else is a 404. */
export default function DynamicServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const page = landingPages.find((item) => item.slug === slug);

  return page ? <HiringLandingPage page={page} /> : <NotFoundPage title="Service not found." />;
}

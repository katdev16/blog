import { Loader } from '@/components/common/Loader/loader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <Loader />
    </div>
  );
}

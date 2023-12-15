import { useAtom } from "jotai";
import { userAtom } from "../../../utils/atom";

const AdminForm = () => {
  const [user] = useAtom(userAtom);

  return (
    <section
      id="adminform"
      className="isolate bg-light dark:bg-dark px-6 py-24 sm:py-32 lg:px-8 h-screen"
    >
      <div className="mx-auto max-w-2xl">
        <div className="space-y-12">
          <div className="border-b border-primary/10 dark:border-dprimary/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-primary dark:text-dprimary mb-10">
              Admin
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminForm;

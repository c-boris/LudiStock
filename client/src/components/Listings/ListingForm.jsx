import { useTranslation } from "react-i18next";

function ListingForm(props) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-19 lg:px-8 bg-light dark:bg-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-primary dark:text-dprimary">
          {props.viewTitle}
          <br />
          <br></br>
        </h2>
        <form onSubmit={props.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
            >
              {t("title")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                placeholder={t("5cars")}
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="headerImage"
              className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
            >
              {t("header")}
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="headerImage"
                onChange={(e) => {
                  props.setHeaderImage(e.target.files[0]);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
            >
              {t("price")}
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="price"
                value={props.price}
                onChange={(e) =>
                  props.setPrice(parseInt(e.target.value, 10) || "")
                }
                required
                className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Description"
              className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
            >
              Description :
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                placeholder={t("15cars")}
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
                required
                className="block w-full rounded-md border-1 border-gray-300 p-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 my-2 resize-y"
              />
            </div>
          </div>
          <label
            htmlFor="age"
            className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
          >
            {t("ageSelection")}
          </label>
          <select
            id="age"
            value={props.selectedAge}
            onChange={props.handleAgeChange}
          >
            <option value="">Selection</option>
            {props.ageAtomValue.map((age) => (
              <option key={age.id} value={age.id}>
                {t(age.label)}
              </option>
            ))}
          </select>

          <label
            htmlFor="state"
            className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
          >
            {t("state")}
          </label>
          <select
            id="state"
            value={props.selectedState}
            onChange={props.handleStateChange}
          >
            <option value="">Selection</option>
            {props.stateAtomValue.map((state) => (
              <option key={state.id} value={state.id}>
                {t(state.label)}
              </option>
            ))}
          </select>

          <label
            htmlFor="category"
            className="block text-lg font-medium leading-6 text-primary dark:text-dprimary"
          >
            {t("categorySelection")}
          </label>
          <select
            id="category"
            value={props.selectedCategory}
            onChange={props.handleCategoryChange}
          >
            <option value="">Selection</option>
            {props.categoryAtomValue.map((category) => (
              <option key={category.id} value={category.id}>
                {t(category.label)}
              </option>
            ))}
          </select>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {props.action}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ListingForm;

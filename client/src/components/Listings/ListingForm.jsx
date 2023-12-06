function ListingForm(props) {
  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-light dark:bg-dark">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary dark:text-dprimary">
          {props.viewTitle}
        </h2>
        <form onSubmit={props.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
            >
              Title (*):
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                placeholder="5 caracters minimum"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
            >
              Price :
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
                className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Description"
              className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
            >
              Description (*):
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="description"
                placeholder="15 caracters minimum"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-2 h-40"
              />
            </div>
          </div>
          <label
            htmlFor="age"
            className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
          >
            Age Selection :
            <br />
          </label>
          <select
            id="age"
            value={props.selectedAge}
            onChange={props.handleAgeChange}
          >
            <option value="">Select a range</option>
            {props.ageAtomValue.map((age) => (
              <option key={age.id} value={age.id}>
                {age.label}
              </option>
            ))}
          </select>

          {/* You can use the selectedAge state value in your form submission */}
          <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
            Selected Age: {props.selectedAge}
          </p>
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
          >
            State Selection :
            <br />
          </label>
          <select
            id="state"
            value={props.selectedState}
            onChange={props.handleStateChange}
          >
            <option value="">Select a state</option>
            {props.stateAtomValue.map((state) => (
              <option key={state.id} value={state.id}>
                {state.label}
              </option>
            ))}
          </select>

          {/* You can use the selectedAge state value in your form submission */}
          <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
            Selected state: {props.selectedState}
          </p>
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-primary dark:text-dprimary"
          >
            Category Selection :
            <br />
          </label>
          <select
            id="category"
            value={props.selectedCategory}
            onChange={props.handleCategoryChange}
          >
            <option value="">Select a category</option>
            {props.categoryAtomValue.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>

          {/* You can use the selectedAge state value in your form submission */}
          <p className="block text-sm font-medium leading-6 text-primary dark:text-dprimary">
            Selected category: {props.selectedCategory}
          </p>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

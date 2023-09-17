import './App.css';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  console.log(errors.name);

  return (
    <div className="bg-slate-900 p-10 rounded-md">
      <form action="" className="flex flex-col gap-1" onSubmit={onSubmit}>
        {/* name */}
        <label className="block text-white" htmlFor="name">
          Name
        </label>
        <input
          className="w-full rounded"
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Name must be at most 20 characters long',
            },
          })}
        />
        <small className="text-red-500 ">{errors.name?.message}</small>

        {/* email */}
        <label className="block text-white" htmlFor="email">
          Email
        </label>
        <input
          className="w-full rounded"
          type="email"
          name="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email is not valid',
            },
          })}
        />
        <small className="text-red-500 ">{errors.email?.message}</small>

        {/* password */}
        <label className="block text-white" htmlFor="password">
          Password
        </label>
        <input
          className="w-full rounded"
          type="password"
          name="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Password must be at most 20 characters long',
            },
          })}
        />
        <small className="text-red-500 ">{errors.password?.message}</small>

        {/* confirm password */}
        <label className="block text-white" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="w-full rounded"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: (value) => {
              return value === watch('password')
                ? true
                : 'The passwords do not match';
            },
          })}
        />
        <small className="text-red-500 ">
          {errors.confirmPassword?.message}
        </small>

        {/* date of birth */}
        <label className="block text-white" htmlFor="date">
          Date of birth
        </label>
        <input
          className="w-full rounded"
          type="date"
          name="date"
          id="date"
          {...register('date', {
            required: 'Date is required',
            validate: (value) => {
              const birthDate = new Date(value);
              const currentDate = new Date();
              const age = currentDate.getFullYear() - birthDate.getFullYear();
              return age < 18
                ? 'You must be over 18 years old.'
                : age > 100
                ? 'The date is invalid.'
                : true;
            },
          })}
        />
        <small className="text-red-500 ">{errors.date?.message}</small>

        {/* country */}
        <label htmlFor="country" className=" text-white">
          Country
        </label>
        <select
          name="country"
          id="country"
          className="w-full rounded"
          {...register('country', { required: 'Country is required' })}
          defaultValue="none"
        >
          <option disabled value="none"></option>
          <option value="mx">Mexico</option>
          <option value="co">Colombia</option>
          <option value="ar">Argentina</option>
        </select>
        <small className="text-red-500 ">{errors.country?.message}</small>
        {(watch('country') === 'mx' ||
          watch('country') === 'co' ||
          watch('country') === 'ar') && (
          <>
            <label htmlFor="province" className="text-white">
              Province
            </label>
            <input
              type="text"
              name="province"
              id="province"
              className="w-full rounded"
              {...register('province', {
                required: 'Province is required',
              })}
            />
            <small className="text-red-500 ">{errors.province?.message}</small>
          </>
        )}

        {/* file */}
        <label htmlFor="file" className="block text-white">
          File
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => {
            setValue('userFile', e.target.files[0]);
          }}
        />

        {/* terms  */}
        <div>
          {' '}
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="mr-2"
            {...register('terms', {
              required: 'Accept terms to proceed.',
            })}
          />
          <label htmlFor="terms" className=" text-white">
            I accept the terms and conditions
          </label>
        </div>
        <small className="text-red-500 ">{errors.terms?.message}</small>

        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-950"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;

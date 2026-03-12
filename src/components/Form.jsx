import { useState } from 'react'
import { useForm } from 'react-hook-form'

function Form() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const [users, setUser] = useState([])

  const onSubmit = (data) => {
    const year = new Date(data.dob).getFullYear()
    if (year <= 2020) {
      setError('dob', { type: 'manual', message: 'Date must be after 2020' })
      return
    }
    setUser([...users, data])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Registration Form
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                {...register("Firstname", { required: true, minLength: 4, maxLength: 8 })}
                placeholder="Enter first name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {errors?.Firstname?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">First name is required</p>
              )}
              {errors?.Firstname?.type === 'minLength' && (
                <p className="text-red-500 text-sm mt-1">First name must be at least 4 characters</p>
              )}
              {errors?.Firstname?.type === 'maxLength' && (
                <p className="text-red-500 text-sm mt-1">First name must be at most 8 characters</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                {...register("Lastname")}
                placeholder="Enter last name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {errors?.email?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
              <input
                type="date"
                {...register("dob", { required: true })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              {errors?.dob?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Date of birth is required</p>
              )}
              {errors?.dob?.type === 'manual' && (
                <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg shadow transition cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>

        {/* Table Card */}
        {users.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registered Users</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-600 text-white text-sm uppercase tracking-wider">
                    <th className="px-5 py-3 font-semibold">First Name</th>
                    <th className="px-5 py-3 font-semibold">Last Name</th>
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">DOB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50 transition text-gray-700">
                      <td className="px-5 py-3">{u.Firstname}</td>
                      <td className="px-5 py-3">{u.Lastname}</td>
                      <td className="px-5 py-3">{u.email}</td>
                      <td className="px-5 py-3">{u.dob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Form
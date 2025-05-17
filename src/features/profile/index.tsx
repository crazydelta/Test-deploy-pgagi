import { useState, useEffect } from 'react'
import { UserCircle } from 'lucide-react'

const LOCAL_KEY = 'pgagi-user-profile'

interface User {
  name: string
  email: string
  role: string
}

export default function ProfileFeature() {
  const defaultUser: User = {
    name: 'Rajesh',
    email: 'rajesh@example.com',
    role: 'Front-End Intern',
  }

  const [user, setUser] = useState<User>(defaultUser)
  const [tempUser, setTempUser] = useState<User>(defaultUser)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as User
        setUser(parsed)
        setTempUser(parsed)
      } catch (err) {
        console.error('Failed to parse user from localStorage:', err)
      }
    }
  }, [])

  const handleSave = () => {
    setUser(tempUser)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tempUser))
    setEditMode(false)
  }

  const handleCancel = () => {
    setTempUser(user)
    setEditMode(false)
  }

  return (
    <section className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Profile</h1>

      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-gray-300 dark:bg-gray-700 p-3">
          <UserCircle size={64} className="text-gray-700 dark:text-gray-300" />
        </div>

        <div className="flex-1">
          {editMode ? (
            <>
              <input
                type="text"
                value={tempUser.name}
                onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                value={tempUser.email}
                onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-black dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <span className="text-sm text-blue-600 dark:text-blue-400">{user.role}</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 space-x-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500 dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </section>
  )
}

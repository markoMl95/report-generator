const useAuth = () => {
  const signIn = (role: string) => {
    localStorage.setItem('role', role)
  }

  const signOut = () => {
    localStorage.removeItem('role')
  }

  const isLogged = () => localStorage.getItem('role')

  return { signIn, signOut, isLogged }
}

export default useAuth

export type AuthContext = ReturnType<typeof useAuth>

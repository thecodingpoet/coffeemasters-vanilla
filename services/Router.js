const Router = {
  init: () => {
    console.log('initializing Router')

    document.querySelectorAll('a.navlink').forEach(link => {
      link.addEventListener('click', e => { 
        e.preventDefault()
        Router.go(e.target.getAttribute('href'))
      })
    })

    window.addEventListener('popstate', e => {
      Router.go(e.state.route, false)
    })

    Router.go(location.pathname)
  },
  go: (route, addToHistory=true) => {
    console.log(`going to ${route}`)

    if (addToHistory) {
      history.pushState({ route }, null, route)
    }

    let pageElement = null

    switch (route) {
      case "/":
        pageElement = document.createElement("h1")
        pageElement.textContent = 'Menu'
        break
      case "/order":
        pageElement = document.createElement("h1")
        pageElement.textContent = 'Your Order'
        break
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("h1")
          pageElement.textContent = 'Details'

          const paramId = route.substring(route.lastIndexOf("-") + 1)
          pageElement.dataset.id = paramId
        }
    }

    if (pageElement) {
      const mainElement = document.querySelector("main")
  
      mainElement.innerHTML = ""
      mainElement.appendChild(pageElement)
      window.scrollX = 0
      window.scrollY = 0
    }
  }
}

export default Router

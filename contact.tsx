/* React */
import React from 'react'

/* React Component */
import Nav from "../components/nav"

/* Static */

export default () => {
  return (
    <>
    <Nav />
    <main>
        <form card="" large="">
            <h3 primary="">Sign in</h3>
            <input type="text" placeholder="Username" />
            <div row="" left="">
                <input type="checkbox" />
                <p grey="">Remember me</p>
            </div>
            <button contain="" primary="">Button</button>
        </form>
    </main>
    </>
  );
}
const customFooter = document.createElement('template')

customFooter.innerHTML = 
`
<div class="footer-icon-container">
<div class="footer-icon"><img src="/img/facebook_icon.png" alt="facebook"></div>
<div class="footer-icon"><img src="/img/twitter.png" alt="twitter"></div>
<div class="footer-icon"><img src="/img/linked_in_icon.png" alt="linkedIn"></div>
</div>
<div>
<p>Derechos reservados, Librería Lovelace, 2022.</p> 
</div>
`

document.querySelector('footer').appendChild(customFooter.content)
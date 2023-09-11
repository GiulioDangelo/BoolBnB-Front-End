<script>
import Loader from './Loader.vue';
export default {
    components: {
        Loader,
    },
    data(){
        return{
            loading: true,
        }
    },
    methods: {
        pageInt() {
            var elements_to_watch = document.querySelectorAll('.watch')

            var callback = function(items){
            items.forEach((item) => {
                if(item.isIntersecting){
                    item.target.classList.add("in-page");
                } else{
                    item.target.classList.remove("in-page");
                }
            });
        }

            var observer = new IntersectionObserver(callback, { threshold: 0.3});

            elements_to_watch.forEach((element) => {
                observer.observe(element);
            });
        }
    },
    mounted(){
        this.pageInt();
    }
        
    
};

</script>

<template>
    <Loader v-if="!loading" />
    <img src="../assets/img/mare.jpg" alt="mare" class="img-bg">
    <div class="section watch">
        <div class="au-card">
            <img src="../assets/img/black-orizontal-logo.png" alt="">
        </div>
    </div>
    <div class="section watch">
        <div class="au-card">
            <div>
                <p> Benvenuti nell'innovativa app di prenotazione per alloggi BnB, il modo più semplice e conveniente per trovare l'alloggio perfetto per il vostro prossimo viaggio! Con la nostra app, esplorare destinazioni emozionanti diventa un'esperienza senza problemi, grazie a un'ampia gamma di opzioni di alloggio tra cui scegliere e a una piattaforma intuitiva che rende il processo di prenotazione un gioco da ragazzi.</p>
            </div>
        </div>
    </div>
    <div class="section watch">
        <div class="au-card">
            <div>
                <p>Che siate in cerca di una confortevole camera privata, di un appartamento accogliente o di una lussuosa villa, la nostra app vi offre una vasta selezione di alloggi unici, adatti a ogni tipo di viaggiatore e a ogni budget. Potete esplorare foto dettagliate, leggere recensioni autentiche da parte di altri utenti e confrontare le opzioni per trovare esattamente ciò di cui avete bisogno.</p>
            </div>
        </div>
    </div>

    <div class="panel">
        <div class="panel-container row-4">
            <div class="col-4 about-card watch fade-text">
                <div class="about-card-content">
                    <p class="about-card-title">Variegata Selezione di Alloggi
                    </p><p class="about-card-para">Dalla tranquillità di una casa in campagna alle comodità di un appartamento in città, offriamo una gamma completa di alloggi che si adattano alle vostre preferenze</p>
                </div>
            </div>
            <div class="col-4 about-card watch fade-text">
                <div class="about-card-content">
                    <p class="about-card-title">Esperienze Autentiche
                    </p><p class="about-card-para">Esperienze Autentiche Vivete esperienze autentiche grazie alle opzioni di alloggio fornite dai locali stessi, offrendovi una visione autentica delle destinazioni che visitate</p>
                </div>
            </div>
            <div class="col-4 about-card watch fade-text">
                <div class="about-card-content">
                    <p class="about-card-title">Facile Prenotazione
                    </p><p class="about-card-para">Prenotare il vostro alloggio ideale non è mai stato così semplice. Basta pochi clic e siete pronti per il vostro prossimo viaggio.</p>
                </div>
            </div>
            <div class="col-4 about-card watch fade-text">
                <div class="about-card-content">
                    <p class="about-card-title">Assistenza 24/7
                    </p><p class="about-card-para">Il nostro team di assistenza è a vostra disposizione 24 ore su 24, 7 giorni su 7, per risolvere qualsiasi problema o rispondere a qualsiasi domanda che possiate avere</p>
                </div>
            </div>
            <div class="col-4 about-card watch fade-text">
                <div class="about-card-content">
                    <p class="about-card-title">Sicurezza e Affidabilità
                    </p><p class="about-card-para">Tutte le prenotazioni sono protette da misure di sicurezza avanzate, garantendo un'esperienza di viaggio senza preoccupazioni</p>
                </div>
            </div>
            <div class="col-4 about-card watch fade-text">
                <div class="about-card-content">
                    <p class="about-card-title">Personalizzazione
                    </p><p class="about-card-para">Utilizzando le vostre preferenze e i vostri interessi, l'app vi suggerisce alloggi e destinazioni che si adattano perfettamente al vostro stile di viaggio</p>
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-second">
        <h2 class="text-gradient p-5">Riconoscenze</h2>
        <div class="panel-container row-4">
            <div class="worker-card watch fade-text">
                    <div class="worker-card-info">
                    <div class="worker-card-avatar"></div>
                    <div class="worker-card-title">Andrea Serra</div>
                    <div class="worker-card-subtitle">Jr. Full-Stack Developer</div>
                    </div>
                    <ul class="worker-card-social">
                        <li class="worker-card-social__item">
                            <a href="https://github.com/Andreaserra1997"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        </li>
                        <li class="worker-card-social__item">
                            <a href="https://www.linkedin.com/in/andrea-serra-b914ba285/"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
                        </li>
                    </ul>
            </div>
            <div class="worker-card watch fade-text">
                    <div class="worker-card-info">
                    <div class="worker-card-avatar"></div>
                    <div class="worker-card-title">Giulio D'Angelo</div>
                    <div class="worker-card-subtitle">Jr. Full-Stack Developer</div>
                    </div>
                    <ul class="worker-card-social">
                        <li class="worker-card-social__item">
                            <a href="https://github.com/GiulioDangelo"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        </li>
                        <li class="worker-card-social__item">
                            <a href="https://www.linkedin.com/in/giulio-d-angelo/"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
                        </li>
                    </ul>
            </div>
            <div class="worker-card watch fade-text">
                    <div class="worker-card-info">
                    <div class="worker-card-avatar"></div>
                    <div class="worker-card-title">Gianluca Giardella</div>
                    <div class="worker-card-subtitle">Jr. Full-Stack Developer</div>
                    </div>
                    <ul class="worker-card-social">
                        <li class="worker-card-social__item">
                            <a href="https://github.com/GianlucaGiardella"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        </li>
                        <li class="worker-card-social__item">
                            <a href="https://www.linkedin.com/in/gianlucagiardella/"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
                        </li>
                    </ul>
            </div>
            <div class="worker-card watch fade-text">
                    <div class="worker-card-info">
                    <div class="worker-card-avatar"></div>
                    <div class="worker-card-title">Andrea Lorenzi</div>
                    <div class="worker-card-subtitle">Jr. Full-Stack Developer</div>
                    </div>
                    <ul class="worker-card-social">
                        <li class="worker-card-social__item">
                            <a href="https://github.com/AndreaLorenzi"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        </li>
                        <li class="worker-card-social__item">
                            <a href="https://www.linkedin.com/in/andrea-lorenzi-429504285/"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
                        </li>
                    </ul>
            </div>
            <div class="worker-card watch fade-text">
                    <div class="worker-card-info">
                    <div class="worker-card-avatar"></div>
                    <div class="worker-card-title">Felice D'Arcangelo</div>
                    <div class="worker-card-subtitle">Jr. Full-Stack Developer</div>
                    </div>
                    <ul class="worker-card-social">
                        <li class="worker-card-social__item">
                            <a href="https://github.com/FeliceDArcangelo"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        </li>
                        <li class="worker-card-social__item">
                            <a href="https://www.linkedin.com/in/felice-d%E2%80%99arcangelo-6a5a6b211/"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
                        </li>
                    </ul>
            </div>
        </div>
    </div>


</template>


<style scoped lang="scss">
@media (max-width: 1000px){
    .section .au-card{
        width: 80%;
        height: 80%;
        left: 10%;
        top: 10%;
      div{
          font-size: 18px;
          padding: .3em;
      }
  }
}


@media (max-width: 800px){
  .section .au-card{
      width: 96%;
      height: 96%;
      left: 2%;
      top: 2%;
      div{
          font-size: 18px;
          padding: .3em;
      }
  }
  .panel{
      height: auto;
  }
  .about-card {
      width: 96%;
  }
  .worker-card-social{
      opacity: 1;
  }

}
</style>


// ============================================================
// DONNÉES PROJETS (modale)
// ============================================================
const projetsData = {
    projet1: {
        titre: "Analyse BI des ventes",
        image: "images/powerbi.png",
        description: "Manipulation de données d'une BDD relationnelle, création de graphiques spécifiques à un besoin opérationnel.",
        lien: null
    },
    projet2: {
        titre: "Visualisation Python avec Matplotlib",
        image: "images/matplotlib.jpg",
        description: "Lecture de CSV avec Pandas et visualisation de données.",
        lien: null
    },
    projet3: {
        titre: "Projet Thérapeutes",
        image: "images/poweramc.jpg",
        description: "Analyse d'un besoin client d'un hôpital, conception d'un MCD, génération d'une BDD relationnelle, manipulation de données.",
        lien: null
    },
    projet4: {
        titre: "TP JAVA Gestion Etudiante",
        image: "images/tpetudiant.png",
        description: "Extraction de données à partir d'un fichier CSV, traitement à l'aide d'une application avec une IHM, visualisation dynamique de données à l'aide de graphiques.",
        lien: null
    },
    projet5: {
        titre: "Simulnation",
        image: "images/simulnation.png",
        description: "Jeu de stratégie et de gestion en ligne multijoueur. Application fonctionnelle hébergée sur le WEB programmée en PHP, SQL, JS, HTML et CSS.",
        lien: "http://simulnation.infinityfreeapp.com"
    },
    projet6: {
        titre: "Projet WEB universitaire",
        image: "images/lecampusvert.png",
        description: "Manipulation des langages front-end CSS et HTML pour une campagne de sensibilisation écologique.",
        lien: "https://nsplay15.github.io/Le-Campus-Vert/"
    },
    projet7: {
        titre: "Projet d'alternance ETL sur mesure",
        image: "images/etl.png",
        description: `<strong>Conception d'un ETL sur mesure pour <a href="https://www.phiseo.fr/" target="_blank">Phiseo</a>.</strong><br>
                       Projet réalisé 100% avec Python en utilisant une BDD <b>SQLite</b> et la librairie <b>Pandas</b>.<br><br>
                       <u>Conception et fonctionnalités :</u>
                       <ul>
                           <li>Architecture ETL, pipelines automatisées et conception modulaire</li>
                           <li>Extraction de données semi structurées</li>
                           <li>Transformation et enrichissement des données</li>
                           <li>Normalisation des structures de données</li>
                           <li>Fusion et dédoublement intelligent d'entités (similarité Levenshtein & règles de priorisation métier)</li>
                       </ul>`,
        lien: null
    }
};

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // --- Animation header ---
    setTimeout(() => {
        document.querySelector('.header-content').classList.add('visible');
    }, 500);

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });

    // --- Navbar scroll ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    let lastScroll = 0;

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll < 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
        lastScroll = currentScroll;
    });

    // --- Gestion de la modale ---
    const modalOverlay = document.getElementById('projet-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');

    function openModal(projetId) {
        const data = projetsData[projetId];
        if (!data) return;
        modalTitle.textContent = data.titre;
        modalImage.src = data.image;
        modalImage.alt = data.titre;
        modalDesc.innerHTML = data.description;
        if (data.lien) {
            modalLink.innerHTML = `<a href="${data.lien}" target="_blank">🔗 Voir le projet</a>`;
        } else {
            modalLink.innerHTML = '';
        }
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // --- Clic sur les cartes projets ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.projetId;
            if (id && projetsData[id]) {
                openModal(id);
            }
        });
    });

    // ============================================================
    // GRAPHE INTERACTIF (arbre hiérarchique pliable)
    // ============================================================
    const container = document.getElementById('mynetwork');

    // --- Définition des nœuds ---
    // Compétences référentielles (niveau 0)
    const compsRef = [
        { id: 'comp1', label: 'Réaliser' },
        { id: 'comp2', label: 'Optimiser' },
        { id: 'comp3', label: 'Administrer' },
        { id: 'comp4', label: 'Gérer' },
        { id: 'comp5', label: 'Conduire' },
        { id: 'comp6', label: 'Collaborer' }
    ];

    // Compétences techniques (niveau 1)
    const techs = [
        { id: 'tech_dev', label: 'Développement' },
        { id: 'tech_bdd', label: 'Base de données' },
        { id: 'tech_reseau', label: 'Réseau' },
        { id: 'tech_web', label: 'Web' },
        { id: 'tech_gp', label: 'Gestion de projet' },
        { id: 'tech_ds', label: 'Data Science' }
    ];

    // Nœuds intermédiaires "Projets" et "Formations" (niveau 2)
    const interNodes = [];
    techs.forEach(tech => {
        interNodes.push(
            { id: `projets_${tech.id}`, label: 'Projets' },
            { id: `formations_${tech.id}`, label: 'Formations, expériences' }
        );
    });

    // Feuilles : projets individuels et formation "BUT Informatique"
    const projetIds = ['projet1', 'projet2', 'projet3', 'projet4', 'projet5', 'projet6', 'projet7'];
    const projetNodes = projetIds.map(id => ({
        id: id,
        label: projetsData[id].titre.length > 20 ? projetsData[id].titre.slice(0,18)+'…' : projetsData[id].titre,
        projetId: id,
        isProjet: true
    }));
    const formationNode = { id: 'formation_but', label: 'BUT Informatique', isFormation: true };

    // --- Associations parent → enfants ---
    // 1. Compétences référentielles → compétences techniques
    const refToTech = {
        comp1: ['tech_dev', 'tech_web'],
        comp2: ['tech_dev', 'tech_web', 'tech_ds'],
        comp3: ['tech_bdd', 'tech_reseau'],
        comp4: ['tech_bdd', 'tech_ds'],
        comp5: ['tech_gp'],
        comp6: ['tech_gp', 'tech_reseau']
    };

    // 2. Compétences techniques → leurs "Projets" et "Formations"
    const techToInter = {};
    techs.forEach(tech => {
        techToInter[tech.id] = [`projets_${tech.id}`, `formations_${tech.id}`];
    });

    // 3. Nœuds "Projets" → projets individuels
    const projetsParTech = {
        tech_dev: ['projet4', 'projet5', 'projet6'],
        tech_bdd: ['projet3', 'projet7'],
        tech_reseau: [], // aucun projet pour l'instant
        tech_web: ['projet5', 'projet6'],
        tech_gp: ['projet3', 'projet7', 'projet1'],
        tech_ds: ['projet1', 'projet2', 'projet7']
    };

    // 4. Nœuds "Formations" → formation_but (partagé)
    const techToFormation = {};
    techs.forEach(tech => {
        techToFormation[tech.id] = ['formation_but'];
    });

    // --- Construction de la liste complète des nœuds ---
    const allNodes = [
        ...compsRef,
        ...techs,
        ...interNodes,
        ...projetNodes,
        formationNode
    ];

    // --- Définition des arêtes ---
    const edgeList = [];

    // Liaisons référentielles → techniques
    for (const [parent, children] of Object.entries(refToTech)) {
        children.forEach(child => {
            edgeList.push({ from: parent, to: child });
        });
    }

    // Liaisons techniques → intermédiaires
    for (const [parent, children] of Object.entries(techToInter)) {
        children.forEach(child => {
            edgeList.push({ from: parent, to: child });
        });
    }

    // Liaisons "Projets" → projets
    for (const [tech, projets] of Object.entries(projetsParTech)) {
        const parent = `projets_${tech}`;
        projets.forEach(projet => {
            edgeList.push({ from: parent, to: projet });
        });
    }

    // Liaisons "Formations" → formation_but
    for (const tech of Object.keys(techToFormation)) {
        const parent = `formations_${tech}`;
        edgeList.push({ from: parent, to: 'formation_but' });
    }

    // --- Création des objets vis.js ---
    const nodes = new vis.DataSet(
        allNodes.map(node => ({
            ...node,
            hidden: true, // tous masqués par défaut
            group: node.isProjet ? 'projet' :
                   node.isFormation ? 'formation' :
                   node.id.startsWith('comp') ? 'competence' :
                   node.id.startsWith('tech_') ? 'technique' :
                   'intermediaire'
        }))
    );

    const edges = new vis.DataSet(
        edgeList.map(edge => ({
            ...edge,
            id: `${edge.from}-${edge.to}`,
            hidden: true
        }))
    );

    // --- Détermination des enfants de chaque nœud ---
    const childrenMap = {};
    allNodes.forEach(node => childrenMap[node.id] = []);
    edgeList.forEach(edge => {
        if (childrenMap[edge.from]) {
            childrenMap[edge.from].push(edge.to);
        }
    });

    // --- Fonctions de gestion de la visibilité ---
    function setNodeHidden(nodeId, hidden) {
        nodes.update([{ id: nodeId, hidden: hidden }]);
    }

    function setEdgeHidden(edgeId, hidden) {
        edges.update([{ id: edgeId, hidden: hidden }]);
    }

    // Masquer ou afficher récursivement un sous-arbre
    function setSubtreeHidden(rootId, hidden) {
        const stack = [rootId];
        while (stack.length) {
            const current = stack.pop();
            setNodeHidden(current, hidden);
            // Masquer les arêtes sortantes
            edgeList.forEach(e => {
                if (e.from === current) {
                    setEdgeHidden(`${e.from}-${e.to}`, hidden);
                }
            });
            // Ajouter les enfants
            if (childrenMap[current]) {
                childrenMap[current].forEach(child => {
                    stack.push(child);
                });
            }
        }
    }

    // Mise à jour globale des arêtes : une arête est visible si ses deux extrémités sont visibles
    function updateAllEdges() {
        const nodeStates = {};
        nodes.forEach(node => {
            nodeStates[node.id] = !node.hidden;
        });
        edges.forEach(edge => {
            const fromVisible = nodeStates[edge.from] || false;
            const toVisible = nodeStates[edge.to] || false;
            const edgeHidden = !(fromVisible && toVisible);
            edges.update([{ id: edge.id, hidden: edgeHidden }]);
        });
    }

    // --- État d'expansion ---
    const expanded = {};

    // --- Fonction pour basculer l'expansion d'un nœud (non-référentiel) ---
    function toggleNode(nodeId) {
        const children = childrenMap[nodeId] || [];
        if (children.length === 0) return;

        const isExpanded = expanded[nodeId] || false;
        const newState = !isExpanded;
        expanded[nodeId] = newState;

        if (newState) {
            // Développer : afficher les enfants directs
            children.forEach(child => {
                setNodeHidden(child, false);
                const edgeId = `${nodeId}-${child}`;
                setEdgeHidden(edgeId, false);
                // Masquer les descendants de l'enfant (sauf s'ils sont déjà développés)
                const descendants = getDescendants(child);
                descendants.forEach(desc => {
                    if (!expanded[desc]) {
                        setNodeHidden(desc, true);
                    }
                });
                // Masquer les arêtes vers les descendants (sauf si le nœud est développé)
                const childEdges = edgeList.filter(e => e.from === child);
                childEdges.forEach(e => {
                    const descendant = e.to;
                    if (!expanded[descendant] && !expanded[child]) {
                        setEdgeHidden(`${e.from}-${e.to}`, true);
                    }
                });
            });
        } else {
            // Réduire : masquer tout le sous-arbre de l'enfant
            children.forEach(child => {
                setSubtreeHidden(child, true);
                const edgeId = `${nodeId}-${child}`;
                setEdgeHidden(edgeId, true);
            });
            // Supprimer l'état expanded pour les descendants
            children.forEach(child => {
                const descendants = getDescendants(child);
                descendants.forEach(desc => {
                    delete expanded[desc];
                });
            });
        }
        updateAllEdges();
    }

    // Fonction utilitaire pour obtenir tous les descendants (récursif)
    function getDescendants(nodeId) {
        const result = [];
        const stack = [...(childrenMap[nodeId] || [])];
        while (stack.length) {
            const current = stack.pop();
            result.push(current);
            if (childrenMap[current]) {
                stack.push(...childrenMap[current]);
            }
        }
        return result;
    }

    // --- Filtrage par compétence référentielle : afficher uniquement les enfants directs ---
    let currentFilter = null;

    function showDirectChildren(compId) {
        // Cacher tout sauf la compétence elle-même
        allNodes.forEach(node => {
            if (node.id === compId) {
                setNodeHidden(compId, false);
            } else {
                setNodeHidden(node.id, true);
            }
        });
        // Cacher toutes les arêtes
        edges.forEach(edge => {
            setEdgeHidden(edge.id, true);
        });

        // Afficher les enfants directs (compétences techniques)
        const children = childrenMap[compId] || [];
        children.forEach(child => {
            setNodeHidden(child, false);
            const edgeId = `${compId}-${child}`;
            setEdgeHidden(edgeId, false);
            // On ne développe pas les enfants de l'enfant, ils restent masqués
            delete expanded[child];
            // Masquer les descendants de l'enfant (ils ne doivent pas être visibles)
            const descendants = getDescendants(child);
            descendants.forEach(desc => {
                setNodeHidden(desc, true);
            });
            // Masquer les arêtes internes à l'enfant
            const childEdges = edgeList.filter(e => e.from === child);
            childEdges.forEach(e => {
                setEdgeHidden(`${e.from}-${e.to}`, true);
            });
        });

        currentFilter = compId;
        updateAllEdges();
    }

    // Réinitialiser à l'état initial : seules les 6 compétences sont visibles
    function resetToInitial() {
        allNodes.forEach(node => {
            if (node.id.startsWith('comp')) {
                setNodeHidden(node.id, false);
            } else {
                setNodeHidden(node.id, true);
            }
        });
        edges.forEach(edge => {
            setEdgeHidden(edge.id, true);
        });
        // Vider expanded
        for (const key in expanded) {
            delete expanded[key];
        }
        currentFilter = null;
        updateAllEdges();
    }

    // --- Initialisation : seuls les compétences référentielles sont visibles ---
    resetToInitial();

    // --- Gestion des clics sur le réseau ---
    const network = new vis.Network(container, { nodes, edges }, {
        nodes: {
            shape: 'dot',
            size: 20,
            font: { size: 14, color: '#fff' },
            shadow: true,
            borderWidth: 2
        },
        edges: {
            width: 2,
            color: { color: '#8899bb', highlight: '#ffffff' },
            smooth: { type: 'continuous' }
        },
        physics: {
            enabled: true,
            stabilization: { iterations: 100 },
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springLength: 200,
                springConstant: 0.08
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            zoomView: true,
            dragView: true
        },
        groups: {
            competence: {
                color: { background: '#e67e22', border: '#d35400' },
                shape: 'dot',
                size: 28,
                font: { color: '#fff' }
            },
            technique: {
                color: { background: '#8e44ad', border: '#6c3483' },
                shape: 'dot',
                size: 24,
                font: { color: '#fff' }
            },
            intermediaire: {
                color: { background: '#1abc9c', border: '#16a085' },
                shape: 'box',
                size: 22,
                font: { color: '#fff' }
            },
            projet: {
                color: { background: '#2980b9', border: '#1a5276' },
                shape: 'box',
                size: 20,
                font: { color: '#fff' }
            },
            formation: {
                color: { background: '#27ae60', border: '#1e8449' },
                shape: 'triangle',
                size: 22,
                font: { color: '#fff' }
            }
        }
    });

    // --- Événement de clic ---
    network.on('click', function(params) {
        if (params.nodes.length === 0) return;
        const nodeId = params.nodes[0];
        const node = nodes.get(nodeId);
        if (!node) return;

        // Vérifier si c'est une compétence référentielle
        if (node.id.startsWith('comp')) {
            // Si c'est la même que le filtre actuel, on réinitialise
            if (currentFilter === node.id) {
                resetToInitial();
            } else {
                // Sinon, on affiche uniquement ses enfants directs
                showDirectChildren(node.id);
            }
            return; // on ne fait pas le toggle standard
        }

        // Sinon, comportement normal (toggle si parent, action si feuille)
        const children = childrenMap[nodeId] || [];
        if (children.length > 0) {
            // Nœud parent (non référentiel) : toggle
            toggleNode(nodeId);
        } else {
            // Feuille : action
            if (node.isProjet && node.projetId) {
                openModal(node.projetId);
            } else if (node.isFormation) {
                const target = document.getElementById('competences');
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        }
    });

    // Ajuster la taille au redimensionnement
    window.addEventListener('resize', function() {
        network.redraw();
    });

}); // fin DOMContentLoaded
/* Lightbox Styles */
#lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

#lightbox.active {
    display: flex;
}

#lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 5px;
}

#close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: white;
    cursor: pointer;
}

/* Responsive Navigation */
.menu-icon {
    display: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
}

@media (max-width: 768px) {
    .menu-icon {
        display: block;
    }

    nav ul {
        flex-direction: column;
        display: none;
        background-color: #7B1818;
        position: absolute;
        top: 60px;
        right: 0;
        width: 100%;
        padding: 10px;
    }

    nav ul li {
        margin: 10px 0;
    }

    nav ul li a {
        color: white;
    }
}
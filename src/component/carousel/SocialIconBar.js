export function SocialIconBar() {
    return (
        <div className="carousel-social-icons">
            <span className="social-icons">
                <button href="https://github.com/uditkumar01">
                    <i class="fab fa-github-alt"></i>
                </button>
                <button href="https://twitter.com">
                    <i class="fab fa-twitter"></i>
                </button>
                <button href="https://linkedin.com">
                    <i class="fab fa-linkedin-in"></i>
                </button>
                <button href="https://facebook.com">
                    <i class="fab fa-facebook-f"></i>
                </button>
            </span>
            <button className="follow-text" href="#">
                FOLLOW US
            </button>
        </div>
    );
}

<script>
    import Canvas from './components/Canvas.svelte';
    import Middleware from './components/Middleware.svelte';
    import Interface from './components/Interface.svelte';
    import Container from './components/Container.svelte';
</script>

<main>
    <Middleware>
        <Container>
            <Interface>
                <Canvas/>
            </Interface>
        </Container>
    </Middleware>
</main>

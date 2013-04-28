ns("Routes.Desk");
ns("Routes.Resources.Range");
(function(R) {

    R.Desk.index = "{{ url('/desk') }}";
    R.Desk.details = "{{ url('/desk/details') }}";
    R.Desk.get_statistics = "{{ url('/desk/get_statistics') }}";
    R.Desk.get_arms = "{{ url('/desk/get_arms') }}";
    R.Desk.get_floorers = "{{ url('/desk/get_floorers') }}";

    R.Counter = {};
    R.Counter.index = "{{ url('/counter') }}";

    R.Resources = {};
    R.Resources.Range = {};
    R.Resources.Range.for_arms = "{{ url('/resources/range/for_arms') }}";
    R.Resources.Range.for_floorers = "{{ url('/resources/range/for_floorers') }}";
    R.Resources.Arm = {};
    R.Resources.Arm.get_info = "{{ url('/resources/arm/get_info') }}";
    R.Resources.Floorer = {};
    R.Resources.Floorer.get_info = "{{ url('/resources/floorer/get_info') }}";

})(ns("Routes"));
export default ({ center, sizedUnit }) => {
    const halfSizedUnit = sizedUnit / 2
    return [
        [
            center[0] - halfSizedUnit,
            center[1] - halfSizedUnit
        ],
        [
            center[0] + halfSizedUnit,
            center[1] - halfSizedUnit
        ],
        [
            center[0] + halfSizedUnit,
            center[1] + halfSizedUnit
        ],
        [
            center[0] - halfSizedUnit,
            center[1] + halfSizedUnit
        ]
    ]
}